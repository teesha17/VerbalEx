import React from "react";
import "./AboutUs.css";
import { Link, useNavigate } from "react-router-dom";

export default function AboutUs() {
  return (
    <section class="about-section">
        <div class="container">
            <div class="row">                
                <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                    <div class="inner-column">
                        <div class="sec-title">
                            <span class="title">About VerbalEx</span>
                            <h2>Verbalex specializes in Optical Character Recognition (OCR) and
                            intelligent document processing</h2>
                        </div>
                        <div class="text">Welcome to Verbalex, a cutting-edge solution at the intersection of technology and convenience. At Verbalex, we specialize in building innovative tools that leverage Optical Character Recognition (OCR) to simplify everyday tasks. Our mission is to empower individuals and businesses by automating the extraction of critical information from documents, reducing manual effort, and saving valuable time.</div>
                      <div class="text">
                      We are passionate about creating seamless user experiences through intuitive design and robust technology. Verbalex stands for accuracy, efficiency, and innovation, ensuring that every interaction with our platform is smooth and effective. Whether you're looking to streamline form autofill processes, digitize records, or enhance operational productivity, Verbalex is your trusted partner in achieving excellence.
                      </div>
                        <div class="btn-box">
                            <Link to='/contactus' class="theme-btn btn-style-one">Contact Us</Link>
                        </div>
                    </div>
                </div>
              
            </div>
            <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                    <div class="inner-column">
           <div class="sec-title">
                            <span class="title">Our Future Goal</span>
                            <h2>We want to lead in innovation & Technology</h2>
                        </div>
          <div class="text">
          Verbalex aims to enhance its OCR accuracy and efficiency, enabling seamless text extraction from a wider range of documents.
              </div>
               <div class="text">
               It plans to integrate AI-powered features for automatic language detection and context-based corrections.
              </div>
               <div class="text">                
               The platform will expand its database management system for better scalability and security. 
              </div>
               <div class="text">
               Verbalex also intends to offer multi-format support for documents, including images, PDFs, and scans.
              </div>
        </div>
        </div>
        </div>
    </section>
  );
}
