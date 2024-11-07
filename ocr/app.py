import streamlit as st
import pytesseract
from PIL import Image
import re
from aadhaar import front_aadhaar
from birth_certificate import birth_certificate
from vehicle_registration import extract_vehicle_registration_details


def extract_details_by_type(doc_type, image_path):
    if doc_type == "Vehicle Registration":
        return extract_vehicle_registration_details(image_path)
    elif doc_type == "Aadhaar Card":
        return front_aadhaar(image_path)
    elif doc_type == "Birth Certificate":
        return front_aadhaar(image_path)
    else:
        return {}

# Define main application with navigation
def main():
    if "page" not in st.session_state:
        st.session_state.page = "home"

    def navigate_to(page):
        st.session_state.page = page

    if st.session_state.page == "home":
        st.title("Document Details Extractor")
        st.write("Choose a document type to extract details:")
        st.button("Vehicle Registration", on_click=lambda: navigate_to("vehicle_registration"))
        st.button("Aadhaar Card", on_click=lambda: navigate_to("aadhaar"))
        st.button("Birth Certificate", on_click=lambda: navigate_to("birth_certificate"))

    elif st.session_state.page == "vehicle_registration":
        st.title("Vehicle Registration Details Extractor")
        uploaded_file = st.file_uploader("Upload your vehicle registration image", type=["jpg", "jpeg", "png"])

        if uploaded_file is not None:
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Image", use_column_width=True)
            details = extract_vehicle_registration_details(uploaded_file)
            st.subheader("Extracted Vehicle Registration Details")
            for key, value in details.items():
                st.write(f"**{key}:** {value}")
        
        if st.button("Back to Home"):
            navigate_to("home")

    # Aadhaar page
    elif st.session_state.page == "aadhaar":
        st.title("Aadhaar Card Details Extractor")
        uploaded_file = st.file_uploader("Upload your Aadhaar card image", type=["jpg", "jpeg", "png"])

        if uploaded_file is not None:
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Image", use_column_width=True)
            details = front_aadhaar(uploaded_file)
            st.subheader("Extracted Aadhaar Card Details")
            for key, value in details.items():
                st.write(f"**{key}:** {value}")

        if st.button("Back to Home"):
            navigate_to("home")
    
    elif st.session_state.page == "birth_certificate":
        st.title("Birth Certificate Details Extractor")
        uploaded_file = st.file_uploader("Upload your Birth Certificate image", type=["jpg", "jpeg", "png"])

        if uploaded_file is not None:
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Image", use_column_width=True)
            details = birth_certificate(uploaded_file)
            st.subheader("Extracted Birth Certificate Details")
            for key, value in details.items():
                st.write(f"**{key}:** {value}")

        if st.button("Back to Home"):
            navigate_to("home")

if __name__ == "__main__":
    main()
