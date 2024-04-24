import React, { useState } from 'react';
import './style.css'; 

// Recipe Data
const recipesData = [
  {
    id: 1,
    name: 'Vegetable Pasta',
    dietaryRestrictions: ['vegan', 'dinner'],
    cookingTime: '30 minutes',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Keto Pancakes',
    dietaryRestrictions: ['keto', 'breakfast'],
    cookingTime: '20 minutes',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Buckwheat Pancakes',
    dietaryRestrictions: ['gluten-free', 'breakfast'],
    cookingTime: '30 minutes',
    isFavorite: false,
  },
  {
    
    id: 4,
    name: 'Chicken Alfredo ',
    dietaryRestrictions: ['halal', 'dinner'],
    cookingTime: '45 minutes',
    isFavorite: false,
  }
  
];

// Recipe component to display individual recipe details

// recipe object
const Recipe = ({ recipe, toggleFavorite }) => {
  const { name, dietaryRestrictions, cookingTime, isFavorite } = recipe;

  return (
    <div className="recipe">
      <h2>{name}</h2>
      <p>{dietaryRestrictions.join(', ')}</p>
      <p>Cooking Time: {cookingTime}</p>
      <button onClick={toggleFavorite}>{isFavorite ? 'Unfavorite' : 'Favorite'}</button>
    </div>
  );
};

const RecipeList = ({ recipes, toggleFavorite }) => {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <Recipe key={recipe.id} recipe={recipe} toggleFavorite={() => toggleFavorite(recipe.id)} />
      ))}
    </div>
  );
};

const RecipeBookApp = () => {
  //State Management for recipes and filter 
  const [recipes, setRecipes] = useState(recipesData);
  const [filter, setFilter] = useState('all');

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe => {


    // Filter by dietary restrictions options
    if (filter !== 'all' && !recipe.dietaryRestrictions.includes(filter)) {
      return false;
    }
    // Filter by search term
    if (searchTerm !== '' && !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;

  });

  const toggleFavorite = recipeId => {
    // Toggle favorite status
  };

  return (
    <div className="recipe-book">
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
       
       {/* Dropdown for filtering recipes by dietary restrictions */}
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="vegan">Vegan</option>
           <option value="keto">Keto</option>
           <option value="dessert">Dessert</option>
          <option value="breakfast">Breakfast</option>
          <option value="dinner">Dinner</option>
          <option value="halal">Halal</option>
          <option value="gluten-free">Gluten-free</option>

          {/* dietary restrictions to filter through */}
        </select>
      </div>

      <RecipeList recipes={filteredRecipes} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default RecipeBookApp;