import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export default function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);

  // fetch popular / default list on load (search = 'chicken' as example)
  useEffect(() => {
    searchMeals("chicken");
  }, []);

  async function searchMeals(q) {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(q)}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (e) {
      setError("Could not fetch recipes. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    searchMeals(query.trim());
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">RecipeBox</h1>
        <form className="search" onSubmit={handleSubmit}>
          <input
            aria-label="Search recipes"
            placeholder="Search recipes (e.g. pasta, chicken)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main className="main">
        {loading && <div className="status">Loading...</div>}
        {error && <div className="status error">{error}</div>}
        {!loading && meals.length === 0 && (
          <div className="status">No recipes found. Try a different search.</div>
        )}

        <section className="grid">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} onSelect={() => setSelectedMeal(meal)} />
          ))}
        </section>
      </main>

      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}

      <footer className="footer">
        Data from TheMealDB — free demo API. See alternatives in app README.
      </footer>
    </div>
  );
}
