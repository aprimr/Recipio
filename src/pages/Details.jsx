import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';

const Details = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=a691441c&app_key=b9a9431f40767ade9accab29216b1954`);
        const data = await response.json();
        setRecipe(data.recipe);
        console.log(data.recipe);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setIsSaved(savedRecipes.some(savedRecipe => savedRecipe.id === id));
  }, [id]);

  const handleToggleSave = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    if (isSaved) {
      const updatedRecipes = savedRecipes.filter(savedRecipe => savedRecipe.id !== id);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    } else {
      savedRecipes.push({ id, ...recipe });
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto bg-gray-300"></div>
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mt-4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-8">Recipe not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <Link to="/recipes" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Recipes
        </Link>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex md:space-x-6">
            <div className="md:w-1/3 relative">
              <img src={recipe.image} alt={recipe.label} className="w-full h-52 md:h-72 object-cover" />
              <button
                onClick={handleToggleSave}
                className="md:hidden absolute bottom-2 right-2 text-red-500 hover:text-red-600 focus:outline-none bg-white bg-opacity-60 rounded-full p-2"
              >
                {isSaved ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              </button>
              <div className="absolute top-2 left-2 flex flex-wrap gap-2">
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
            </div>
            <div className="md:w-2/3 p-6">
              <div className="mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-purple-800">{recipe.label}</h1>
                <button
                  onClick={handleToggleSave}
                  className="hidden md:block text-red-500 hover:text-red-600 focus:outline-none"
                >
                  {isSaved ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </button>
              </div>
              <h2 className="text-xl font-semibold text-purple-700 mb-2">Ingredients:</h2>
              <ul className="list-disc list-inside mb-4">
                {recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
              <h2 className="text-xl font-semibold text-purple-700 mb-2">Instructions:</h2>
              <p className="text-gray-700">
                For detailed instructions, please visit:{' '}
                <a href={recipe.url} target="_blank" className="text-purple-600 hover:text-purple-800">
                  {recipe.source}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
