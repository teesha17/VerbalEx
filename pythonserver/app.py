from flask import Flask, request, jsonify
from flask_cors import CORS
from passport import passport
from aadhaar import front_aadhaar 
from vehicle_registration import vehicle_registration
from birthCertificate import birth_certificate

app = Flask(__name__)
CORS(app)  


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

@app.route("/extract-vehicle-details", methods=["POST"])
def handle_vehicle_extraction():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    image = request.files['image']
    details = vehicle_registration(image)
    return jsonify(details)\
    
@app.route("/extract-birth-details", methods=["POST"])
def handle_vehicle_extraction():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    image = request.files['image']
    details = birth_certificate(image)
    return jsonify(details)

if __name__ == "__main__":
    app.run(debug=True)
