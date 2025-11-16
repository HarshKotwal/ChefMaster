export default function Main() {
  return (
    <main>
      <form className="addIngredientForm">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
        />
        <button>+ Add ingredients</button>
      </form>
    </main>
  );
}
