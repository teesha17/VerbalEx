from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import re
import cv2
import numpy as np
from aadhaar import front_aadhaar 

app = Flask(__name__)
CORS(app)  


def preprocess_for_bold_text(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
    opening = cv2.morphologyEx(gray, cv2.MORPH_OPEN, kernel)
    contrast = cv2.addWeighted(opening, 2, opening, -0.5, 0)
    _, binary = cv2.threshold(contrast, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    sharpened = cv2.filter2D(binary, -1, np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]))
    return sharpened


def extract_names(text):
    name_regex = r"Given Name(s)[\s:]+([A-Z][a-z]\s]+)"
    surname_regex = r"Surname[\s:]+([A-Za-z\s]+)"
    name_match = re.search(name_regex, text, re.IGNORECASE)
    surname_match = re.search(surname_regex, text, re.IGNORECASE)
    name = name_match.group(1).strip() if name_match else ""
    surname = surname_match.group(1).strip() if surname_match else ""
    return name, surname


def extract_all_dates(text):
    regex = r"\b(\d{2}[/\-.]\d{2}[/\-.](?:\d{4}|\d{2}))\b"
    dates = sorted(set(re.findall(regex, text)), key=lambda x: int(re.split(r"[-/]", x)[-1]))
    return dates


def extract_all_places(text):
    dates = re.findall(r"\b(\d{2}[/\-.]\d{2}[/\-.](?:\d{4}|\d{2}))\b", text)
    last_date = dates[-1] if dates else None
    places = []
    if last_date:
        parts = text.split("\n")
        for part in parts:
            if re.match(r'^[A-Z,. -\'"]+$', part) and len(part.strip()) > 1:
                places.append(part.strip())
    return places


def extract_passport_number(text):
    regex = r"[A-Z][0-9]{7}"
    match = re.search(regex, text)
    return match.group(0) if match else ""


def extract_details(text):
    lines = text.split("\n")
    clean = []
    for line in lines:
        clean_line = re.sub(r"[^a-zA-Z\s]", "", line)
        if (
            re.match(r"^[A-Z\s]{3,}$", clean_line)
            and "INDIA" not in clean_line
            and "REPUBLIC" not in clean_line
            and "PASSPORT" not in clean_line
        ):
            clean.append(clean_line.strip())

    name = clean[1] if len(clean) > 1 else ""
    surname = clean[0] if len(clean) > 0 else ""
    gender = "Male" if "M" in clean[-1] else "Female" if "F" in clean[-1] else ""
    return gender, name, surname


def extract_passport_details(image_path):
    image = Image.open(image_path).convert("RGB")
    extracted_text = pytesseract.image_to_string(image)

    image_np = np.array(image)
    preprocessed = preprocess_for_bold_text(image_np)
    clean_text = pytesseract.image_to_string(Image.fromarray(preprocessed))

    dates = extract_all_dates(extracted_text)
    dob, doi, expiry_date = dates[0:3] if len(dates) >= 3 else ("", "", "")
    passport_number = extract_passport_number(extracted_text)

    places = extract_all_places(extracted_text)
    pob = places[-2] if len(places) > 1 else ""
    poi = places[-1] if len(places) > 0 else ""

    gender, name, surname = extract_details(clean_text)

    return {
        "Name": name,
        "Surname": surname,
        "Passport Number": passport_number,
        "Gender": gender,
        "Place of Birth": pob,
        "Date of Birth": dob,
        "Place of Issue": poi,
        "Date of Issue": doi,
        "Expiry Date": expiry_date,
    }


def passport(image_path):
    return extract_passport_details(image_path)

@app.route("/extract-passport-details", methods=["POST"])
def handle_passport_extraction():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']
    details = passport(image)

    return jsonify(details)

@app.route("/extract-aadhaar-details", methods=["POST"])
def handle_aadhaar_extraction():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']
    details = front_aadhaar(image)

    return jsonify(details)

if __name__ == "__main__":
    app.run(debug=True)
