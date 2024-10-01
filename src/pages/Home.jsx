import React, { useState, useEffect } from 'react';
import { FaUtensils, FaSearch, FaHeart, FaArrowUp, FaArrowRight } from 'react-icons/fa';
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdSoupKitchen } from "react-icons/md";
import { useNavigate, NavLink } from 'react-router-dom';
import Vid1 from '../assets/Videos/Vid-1.mp4';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/recipes');
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=popular&app_id=a691441c&app_key=b9a9431f40767ade9accab29216b1954');
        const data = await response.json();
        setFeaturedRecipes(data.hits.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured recipes:', error);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Welcome to Recip.io</h1>
          <p className="text-xl text-gray-700">Discover, Create, and Share Delicious Recipes</p>
        </section>

        <div onClick={handleExploreClick} className="my-10 flex justify-center">
          <button className="border-2 border-purple-600 text-purple-600 font-bold py-2 px-4 rounded-full transition duration-300 transform hover:bg-purple-700 hover:text-white flex items-center group">
            Explore Recipes
            <FaArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
              <FaSearch className="mr-2" /> Find Recipes
            </h2>
            <p className="text-gray-600 mb-4">Search our extensive database of mouth-watering recipes.</p>
            <img src="https://plus.unsplash.com/premium_photo-1677619680553-732e8e153db2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHJlY2lwZXxlbnwwfHwwfHx8MA%3D%3D" alt="Recipe Search" className="w-full h-40 md:h-56 object-cover rounded-md" />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
              <FaUtensils className="mr-2" /> Cook with Ease
            </h2>
            <p className="text-gray-600 mb-4">Follow step-by-step instructions with video tutorials.</p>
            <div className="w-full h-40 md:h-56 rounded-md overflow-hidden relative">
              <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={Vid1}
                title="Recip.io"
                autoPlay
                loop
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
        
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">Featured Recipes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.recipe.uri} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={recipe.recipe.image} alt={recipe.recipe.label} className="w-full h-56 object-cover md:h-64" />
                <div className="p-4">
                  <h3 className="text-xl text-purple-600 font-semibold mb-2">{recipe.recipe.label}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.recipe.cuisineType && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {recipe.recipe.cuisineType[0]}
                      </span>
                    )}
                    {recipe.recipe.mealType && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {recipe.recipe.mealType[0]}
                      </span>
                    )}
                    {recipe.recipe.dietLabels && recipe.recipe.dietLabels.map((label, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center items-center mt-4 w-full">
                    <NavLink 
                      to={`/details/${recipe.recipe.uri.split('_')[1]}`}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300 w-full text-center"
                    >
                      View Recipe
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 flex items-center justify-center md:text-4xl md:mb-10">
            <MdSoupKitchen className="mr-2" /> Why Recip.io ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <BiSolidFoodMenu className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Diverse Recipes</h3>
              <p className="text-gray-600">Explore cuisines from around the world.</p>
            </div>
            <div>
              <FaHeart className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Save Favorites</h3>
              <p className="text-gray-600">Keep your beloved recipes in one place.</p>
            </div>
            <div>
              <FaSearch className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-700 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find recipes based on ingredients you have.</p>
            </div>
          </div>
        </section>
      </main>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-xl text-purple-600 bg-white shadow md:hidden"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
