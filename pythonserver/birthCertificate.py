import re
import pytesseract
from PIL import Image
import cv2
import numpy as np
from googletrans import Translator

def preprocess_for_bold_text(image):
    """
    Preprocesses an image to enhance the extraction of bold text.
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
    opening = cv2.morphologyEx(gray, cv2.MORPH_OPEN, kernel)
    contrast = cv2.addWeighted(opening, 2, opening, -0.5, 0)
    _, binary = cv2.threshold(contrast, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    sharpened = cv2.filter2D(binary, -1, np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]))
    return sharpened

def translate_text(text, src_lang='gu', dest_lang='en'):
    """Translates text from Gujarati to English."""
    translator = Translator()
    translated = translator.translate(text, src=src_lang, dest=dest_lang)
    return translated.text if translated else text

def extract_details(text):
    """
    Extracts name and date of birth from the translated text.
    """
    name_regex = r"\bName\s*[:\-]\s*([A-Za-z]+)"  # Extracts first name only
    dob_regex = r"\bDate\s*of\s*Birth\s*[:\-]\s*(\d{2}/\d{2}/\d{4}|\d{2}-\d{2}-\d{4})"  # Extracts DOB in dd/mm/yyyy or dd-mm-yyyy format
    
    details = {
        "name": re.search(name_regex, text, re.IGNORECASE).group(1).strip() if re.search(name_regex, text, re.IGNORECASE) else "",
        "date_of_birth": re.search(dob_regex, text, re.IGNORECASE).group(1).strip() if re.search(dob_regex, text, re.IGNORECASE) else ""
    }
    
    return details

def extract_birth_certificate_details(image_path):
    """
    Extracts and translates birth certificate details from Gujarati to English.
    """
    image = Image.open(image_path)
    extracted_text = pytesseract.image_to_string(image, lang='guj')  # Extract Gujarati text
    translated_text = translate_text(extracted_text)  # Translate to English
    details = extract_details(translated_text)  # Extract information
    
    return details

def birth_certificate(image_path):
    """Convenience function to extract and translate birth certificate details."""
    return extract_birth_certificate_details(image_path)
