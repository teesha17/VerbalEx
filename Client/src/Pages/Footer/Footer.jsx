import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
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
  )
}
