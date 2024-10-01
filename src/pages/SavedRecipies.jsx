import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { IoHeart } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const SavedRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const localData = localStorage.getItem('savedRecipes');
    if (localData) {
      setSavedRecipes(JSON.parse(localData));
    }
  }, []);

  const filteredRecipes = savedRecipes.filter(recipe =>
    recipe.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe.cuisineType && recipe.cuisineType[0].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRemoveFavorite = (recipeToRemove) => {
    const updatedRecipes = savedRecipes.filter(recipe => recipe.uri !== recipeToRemove.uri);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Saved Recipes</h1>
        
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search saved recipes..."
              className="w-full py-2 px-4 pr-20 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 focus:outline-none"
                aria-label="Clear search"
              >
                <FaTimes className="w-6 h-6 bg-gray-200 text-purple-700 text-2xl rounded-full p-[6px]" />
              </button>
            )}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 focus:outline-none"
              aria-label="Search saved recipes"
            >
              <FaSearch className="w-8 h-8 bg-purple-700 text-white text-2xl rounded-full p-2" />
            </button>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <div key={recipe.uri} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                <img src={recipe.image} alt={recipe.label} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">{recipe.label}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {recipe.cuisineType && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center justify-center">
                        {recipe.cuisineType[0]}
                      </span>
                    )}
                    {recipe.mealType && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center justify-center">
                        {recipe.mealType[0]}
                      </span>
                    )}
                    {recipe.dietLabels && recipe.dietLabels.length > 0 && (
                      <>
                        {recipe.dietLabels.map((label, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded mr-1 mb-1 flex items-center justify-center">
                            {label}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <NavLink 
                      to={`/details/${encodeURIComponent(recipe.uri.split('_')[1])}`}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
                    >
                      View Recipe
                    </NavLink>
                    <button 
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                      onClick={() => handleRemoveFavorite(recipe)}
                    >
                      <IoHeart className="w-7 h-7" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center justify-center">
              <FaSearch className="mr-2 animate-pulse" />
              No Saved Recipes Found
            </h2>
            <p className="text-gray-600 flex items-center justify-center">
              <span className="mr-2">Start saving your favorite recipes! <NavLink to="/recipes" className="text-purple-600 hover:text-purple-700">Browse Recipes</NavLink></span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
