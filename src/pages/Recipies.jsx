import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const localData = localStorage.getItem('savedRecipes');
    return localData ? JSON.parse(localData) : [];
  });

  const generateRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  useEffect(() => {
    fetchRecipes('');
  }, []);

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
        params: {
          type: 'public',
          q: query || generateRandomLetter(),
          app_id: 'a691441c',
          app_key: 'b9a9431f40767ade9accab29216b1954'
        }
      });
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchRecipes(searchTerm);
  };

  const handleToggleSave = (recipe) => {
    setSavedRecipes(prevSaved => {
      const isAlreadySaved = prevSaved.some(saved => saved.uri === recipe.uri);
      if (isAlreadySaved) {
        return prevSaved.filter(saved => saved.uri !== recipe.uri);
      } else {
        return [recipe, ...prevSaved];
      }
    });
  };

  const getRecipeId = (uri) => {
    return uri.split('_')[1];
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchRecipes('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Recipes</h1>
        
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full py-2 px-4 pr-20 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 focus:outline-none"
              aria-label="Search recipes"
            >
              <FaSearch className="w-8 h-8 bg-purple-700 text-white text-2xl rounded-full p-2" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <NoRecipesFound searchTerm={searchTerm} />
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-48 md:h-60 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">{recipe.recipe.label}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {recipe.recipe.cuisineType && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center justify-center">
                        {recipe.recipe.cuisineType[0]}
                      </span>
                    )}
                    {recipe.recipe.mealType && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center justify-center">
                        {recipe.recipe.mealType[0]}
                      </span>
                    )}
                    {recipe.recipe.dietLabels && recipe.recipe.dietLabels.length > 0 && (
                      <>
                        {recipe.recipe.dietLabels.map((label, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded mr-1 mb-1 flex items-center justify-center">
                            {label}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <NavLink 
                      to={`/details/${getRecipeId(recipe.recipe.uri)}`}
                      className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
                    >
                      View Recipe
                    </NavLink>
                    <button 
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                      onClick={() => handleToggleSave(recipe.recipe)}
                    >
                      {savedRecipes.some(saved => saved.uri === recipe.recipe.uri) ? (
                        <IoHeart className="w-7 h-7" />
                      ) : (
                        <IoHeartOutline className="w-7 h-7" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const NoRecipesFound = ({ searchTerm }) => (
  <div className="text-center py-8">
    <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center justify-center">
      <FaSearch className="mr-2 animate-pulse" />
      No Recipes Found
    </h2>
    <p className="text-gray-600 flex items-center justify-center">
      <span className="mr-2">Sorry, we couldn't find any recipes matching <b>{searchTerm}</b>. Try different keywords or browse our random selections.</span>
    </p>
  </div>
);

export default Recipes;
