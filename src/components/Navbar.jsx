import React, { useState } from 'react';
import { MdSoupKitchen } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { TiStarFullOutline } from "react-icons/ti";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  }

  const handleMobMenuClick = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 10);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <MdSoupKitchen className="h-8 w-8 text-white mr-2" />
            <span className="text-xl font-bold text-white">
              Recip.io
            </span>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-8">
              <NavLink to="/" className={({isActive}) => `px-3 py-2 text-lg font-medium ${isActive ? 'text-yellow-300' : 'text-white group'} transition duration-300 relative`}>
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>
              <NavLink to="/recipes" className={({isActive}) => `px-3 py-2 text-lg font-medium ${isActive ? 'text-yellow-300' : 'text-white group'} transition duration-300 relative`}>
                Recipes
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </NavLink>
            </div>
          </div>
          
          {/* Saved Recipes Button - Desktop */}
          <div className="hidden md:block">
            <NavLink to="/saved" className={({isActive}) => `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-purple-800 text-yellow-300' : 'bg-white text-purple-600 hover:bg-purple-100'} transition duration-300`}>
              <TiStarFullOutline className="mr-2 text-xl" />
              Saved Recipes
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 bg-white hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 w-full flex flex-col items-center justify-around space-y-1 sm:px-3">
            <NavLink to="/" className={({isActive}) => `block w-full px-3 py-2 rounded-md text-base ${isActive ? 'text-yellow-300' : 'text-white'} font-medium transition-all duration-300`} onClick={handleMobMenuClick}>Home</NavLink>
            <NavLink to="/recipes" className={({isActive}) => `block w-full px-3 py-2 rounded-md text-base ${isActive ? 'text-yellow-300' : 'text-white'} font-medium transition-all duration-300`} onClick={handleMobMenuClick}>Recipes</NavLink>
            <NavLink to="/saved" className={({isActive}) => `block w-full px-3 py-2 rounded-md text-base ${isActive ? 'text-yellow-300' : 'text-white'} font-medium transition-all duration-300`} onClick={handleMobMenuClick}>Saved Recipes</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
