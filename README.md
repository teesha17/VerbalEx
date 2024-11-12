# VerbalEx

VerbalEx is a tool designed to simplify and automate user data extraction from government-issued ID cards. By capturing an image of an ID card, VerbalEx extracts essential information and organizes it in a structured format. This data can be accessed via an API, enabling various applications such as automated form filling, language translation of regional documents, and integration with e-signature services.

## Project Overview

The project focuses on using Optical Character Recognition (OCR) to collect and store user data by extracting text from ID card images. This solution is aimed at creating a streamlined process for applications that require extensive data entry, multilingual support, and digital signature functionalities.

## Tech Stack

- **Frontend:** React.js (Client)
- **Backend:** Node.js with Express.js (Server)
- **Database:** MongoDB
- **Machine Learning/OCR:** Python with Tesseract OCR library

## Future Scope

1. **Form Filling Automation:** The extracted data can be used for pre-filling forms in different applications, saving time and minimizing errors in manual data entry.
2. **Language Translation:** Enabling translation of extracted data into regional languages, facilitating applications across multilingual audiences.
3. **E-signature Integration:** Integrating extracted data with e-signature functionalities for secure and authenticated document signing.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
MONGO_URI=""
PORT=
JWT_SECRET=""
NODE_ENV=""
accessToken=""
