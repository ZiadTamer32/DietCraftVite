import { useRecipes } from "../context/RecipesContext";
import Result from "../features/DietRecommendation/Results";

function Recipes() {
  const { data = [] } = useRecipes();

  return (
    <ul className="grid gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.slice(0, 10)?.map((dessert, index) => (
        <>
          <Result dessert={dessert} key={index} />
        </>
      ))}
    </ul>
  );
}

export default Recipes;
