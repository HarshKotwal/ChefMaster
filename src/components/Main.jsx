import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    try {
      const res = await fetch("https://chef-master-api.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      if (!res.ok) {
        const text = await res.text();
        // console.error("Server error:", res.status, text);
        setRecipe(`Server error: ${res.status}`);
        return;
      }
      const data = await res.json();
      // console.log("Recipe from backend:", data.recipe);
      setRecipe(data.recipe || "No recipe returned from AI");
    } catch (err) {
      // console.error("Failed to fetch recipe:", err);
      setRecipe("Failed to fetch recipe from server.");
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (newIngredient && newIngredient.trim()) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  return (
    <main>
      <form action={addIngredient} className="addIngredientForm">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredients</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
