import { useRecipes } from "../context/RecipesContext";
import Result from "../features/DietRecommendation/Results";

function Recipes() {
  const { data = [] } = useRecipes();

  return (
    <div className="px-5 space-y-4">
      {data.slice(0, 10).map((dessert, index) => (
        <Result key={index} dessert={dessert} />
      ))}
    </div>
  );
}

export default Recipes;
