import React from 'react';
import { useNavigate,Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the token exists

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate("/"); // Navigate to the home page
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center" onClick={()=>{navigate("/")}}>
            <span className="text-2xl font-bold text-blue-600">Verbalex</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4">
            {/* About Us */}
            <button
              onClick={() => navigate("/aboutus")}
              className="text-base font-medium text-gray-700 hover:text-blue-600"
            >
              About Us
            </button>

            {/* Contact Us */}
            <button
              onClick={() => navigate("/contactus")}
              className="text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Contact Us
            </button>

            {/* Conditional rendering based on token */}
            {!token ? (
              <>
                {/* Login */}
                <button
                  onClick={handleLogin}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>

                {/* Signup */}
                <button
                  onClick={handleSignup}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Sign up
                </button>
              </>
            ) : (
                <>
                <button
                  onClick={()=>navigate('/dashboard')}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  DashBoard
                </button>
              <button
                onClick={handleLogout}
                className="text-base font-medium text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
