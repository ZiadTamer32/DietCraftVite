import { useRecipes } from "../context/RecipesContext";
import Result from "../features/DietRecommendation/Results";

function Recipes() {
  const { data = [] } = useRecipes();

  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-center">Featured Recipes</h2>
      <p className="text-gray-700 text-md">
        Discover our collection of delicious, easy-to-follow recipes that will
        help you stay on track with your fitness goals.
      </p>
      <input
        type="search"
        placeholder="search here...."
        className="border border-gray-200"
      />
      <ul className="grid grid-cols-2 gap-6">
        {data.slice(0, 4).map((dessert, index) => (
          <Result key={index} dessert={dessert} />
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
