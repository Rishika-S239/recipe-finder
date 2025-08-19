import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import hero1 from "../assets/hero1.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchMode, setSearchMode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const API_KEY = "fe3d6129751b410cb21ed62c26fccbd1";
useEffect(() => {
  const fetchPopular = async () => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=3&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setPopularRecipes(data.results || []);
  };
  fetchPopular();
}, []);

  const handleSearchClick = () => {
    setShowOptions(true);
  };
  const handlePerformSearch = async () => {
    if (!searchInput) {
      alert("Please type something to search");
      return;
    }
    let url = "";
    if (searchMode == "ingredients") {
      url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${API_KEY}`;
    } else if (searchMode == "recipes") {
      url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${API_KEY}`;
      console.log("Searching recipes by name: ", searchInput);
    }
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.results || []);
    // localStorage.setItem("recipes", JSON.stringify(data.results));
    console.log(data);
  };
  // const handleReset = () => {
  // setRecipes([]);
  // localStorage.removeItem("recipes");
  // setQuery("");
  // clear search input //

  const handleRecipeClick = async (id) => {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedRecipe(data);
    console.log(data);
  };
  return (
    <>
      {/* <header className="header">
        
      </header> */}
      <div className="home-wrapper">
        <h1>Turn Ingredients Into Meals</h1>
        <h3 className="intro-text">
         Don’t know what to cook? Enter your ingredients and we’ll find the perfect recipe for you.
        </h3>
        {!showOptions && (
          <div className="button">
            <button onClick={() => setSearchMode("ingredients")}>
              Search by Ingredients
            </button>
            <button onClick={() => setSearchMode("recipes")}>
              Search by Recipe Name
            </button>
          </div>
        )}
        {searchMode && (
          <div className="sb">
            <input
              type="text"
              placeholder={
                searchMode === "ingredients"
                  ? "Enter Ingredients"
                  : "Enter Dish name"
              }
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="gb" onClick={handlePerformSearch}>
              Go
            </button>
          </div>
        )}
      </div>
      {recipes && recipes.length > 0 && (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      {recipes.length === 0 && (
        <section className="featured-section">
          <h2>Popular Recipes</h2>
          <div className="card-list">
            {popularRecipes.map((recipe) => (
              <div key={recipe.id} className="rc">
                <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
              </Link>
                  {/* <img src={recipe.image} alt={recipe.title} />
                  <p>{recipe.title}</p> */}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
export default Home;
