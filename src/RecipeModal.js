import React from "react";

function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) items.push(`${measure ? measure + " " : ""}${ing}`);
  }
  return items;
}

export default function RecipeModal({ meal, onClose }) {
  const ingredients = getIngredients(meal);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-grid">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div>
            <h2>{meal.strMeal}</h2>
            <p className="meta">{meal.strCategory} · {meal.strArea}</p>
            <h4>Ingredients</h4>
            <ul className="ingredients">
              {ingredients.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
            <h4>Instructions</h4>
            <p className="instructions">{meal.strInstructions}</p>
            {meal.strSource && <p>Source: <a href={meal.strSource} target="_blank" rel="noreferrer">Original</a></p>}
          </div>
        </div>
      </div>
    </div>
  );
}
