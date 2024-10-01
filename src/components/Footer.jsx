import React from 'react';
import { MdSoupKitchen } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';               
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-8">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-4">
          {/* Logo and Name */}
          <div className="flex items-center mb-6 cursor-pointer md:mb-0" onClick={handleLogoClick}>
            <MdSoupKitchen className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Recip.io</span>
          </div>

          {/* Navigation Links */}
          <nav className="mb-6 md:mb-0">
            <ul className="flex space-x-6">
              <li><NavLink to="/" className="text-xl font-semibold hover:text-yellow-300 transition-colors duration-300">Home</NavLink></li>
              <li><NavLink to="/recipes" className="text-xl font-semibold hover:text-yellow-300 transition-colors duration-300">Recipes</NavLink></li>
            </ul>
          </nav>

          {/* Social Handles */}
          <div className="flex space-x-4">
            <a className="hover:text-yellow-300 transition-colors duration-300">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a className="hover:text-yellow-300 transition-colors duration-300">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a className="hover:text-yellow-300 transition-colors duration-300">
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Policy and Terms */}
        <div className="flex justify-center space-x-6 mb-6">
          <NavLink to="/privacy-policy" className="text-xs underline hover:text-gray-200 transition-colors duration-300">Privacy Policy</NavLink>
          <NavLink to="/terms" className="text-xs underline hover:text-gray-200 transition-colors duration-300">Terms of Service</NavLink>
        </div>

        {/* Copyright and Made By */}
        <div className="flex flex-nowrap justify-between items-center text-sm border-t border-gray-300 pt-4">
          <div>&copy; {new Date().getFullYear()} Recip.io</div>
          <div className="flex items-center gap-5 mr-5">
            <a href="https://github.com/aprimr/" target="_blank" className=" px-1 py-1 hover:bg-white rounded-md hover:text-purple-600 transition-colors duration-300">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/aprimregmi0/" target="_blank" className=" px-1 py-1 hover:bg-white rounded-md hover:text-purple-600 transition-colors duration-300">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
