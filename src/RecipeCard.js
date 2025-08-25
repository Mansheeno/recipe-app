import React from "react";

export default function RecipeCard({ meal, onSelect }) {
  return (
    <article className="card" onClick={onSelect}>
      <div className="card-image">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
      <div className="card-body">
        <h3>{meal.strMeal}</h3>
        <p className="meta">{meal.strArea || "Unknown Cuisine"}</p>
      </div>
    </article>
  );
}
