import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate('/dashboard');
    }
  })
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Verbalex</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignup}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    Extract data from images
                  </span>{" "}
                  <span className="block text-blue-600 xl:inline">
                    with Verbalex
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Verbalex is an advanced OCR tool that extracts data from
                  images and classifies documents with high accuracy. Streamline
                  your workflow with our powerful API.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/placeholder.svg"
            alt="OCR illustration"
          />
        </div>
      </div>

      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Why Choose Verbalex
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Unparalleled Document Processing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover why Verbalex is the preferred choice for businesses
              seeking efficient and accurate document processing solutions.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: "Cutting-edge OCR Technology",
                  description:
                    "Our advanced algorithms ensure the highest accuracy in data extraction from various document types.",
                },
                {
                  title: "Seamless API Integration",
                  description:
                    "Easily incorporate Verbalex into your existing workflows with our robust and well-documented API.",
                },
                {
                  title: "Scalable Solutions",
                  description:
                    "Whether you're a small business or a large enterprise, Verbalex scales to meet your document processing needs.",
                },
                {
                  title: "Secure and Compliant",
                  description:
                    "We prioritize the security of your data, adhering to industry-standard compliance regulations.",
                },
              ].map((feature) => (
                <div key={feature.title} className="relative">
                  <dt>
                    <CheckCircle className="absolute h-6 w-6 text-green-500" />
                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                      {feature.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-9 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powerful OCR capabilities
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Verbalex offers state-of-the-art OCR technology to meet all your
              data extraction needs.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: "High Accuracy",
                  description:
                    "Our advanced algorithms ensure high accuracy in data extraction from various image types.",
                },
                {
                  name: "Document Classification",
                  description:
                    "Automatically classify documents to streamline your document management process.",
                },
                {
                  name: "API Integration",
                  description:
                    "Easily integrate Verbalex into your existing workflows with our robust API.",
                },
                {
                  name: "Multi-language Support",
                  description:
                    "Extract text from documents in multiple languages with our comprehensive language support.",
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      {/* You can add icons here if needed */}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
          <div className="py-12 px-4 sm:px-6 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 md:border-r md:border-gray-200 lg:pr-16">
            <div className="md:flex-shrink-0">
              <img
                className="h-12"
                src="/placeholder.svg?height=48&width=200"
                alt="Company 1 logo"
                width="200"
                height="48"
              />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-gray-800 md:flex-grow">
                <p className="relative">
                  Verbalex has revolutionized our document processing. The
                  accuracy and speed of data extraction are unparalleled.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="/placeholder.svg?height=48&width=48"
                      alt="Testimonial avatar"
                      width="48"
                      height="48"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-base font-medium text-gray-500">
                      CTO, TechCorp
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="py-12 px-4 sm:px-6 md:py-16 md:pr-0 md:pl-10 lg:pl-16">
            <div className="md:flex-shrink-0">
              <img
                className="h-12"
                src="/placeholder.svg?height=48&width=200"
                alt="Company 2 logo"
                width="200"
                height="48"
              />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-gray-800 md:flex-grow">
                <p className="relative">
                  The API integration was seamless, and it has significantly
                  improved our document classification process.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="/placeholder.svg?height=48&width=48"
                      alt="Testimonial avatar"
                      width="48"
                      height="48"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">
                      Michael Lee
                    </div>
                    <div className="text-base font-medium text-gray-500">
                      CEO, DataFlow Inc.
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div>
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <span className="text-2xl font-bold text-white">Verbalex</span>
                <p className="text-gray-300 text-base">
                  Advanced OCR solutions for your document processing needs.
                </p>
                <div className="flex space-x-6">
                  {/* Add social media icons here if needed */}
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                      Solutions
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          OCR
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Document Classification
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Data Extraction
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                      Support
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          API Reference
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                      Company
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                      Legal
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Privacy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-base text-gray-400 hover:text-white"
                        >
                          Terms
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8">
              <p className="text-base text-gray-400 xl:text-center">
                &copy; 2024 Verbalex, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
