import { useRecipes } from "../context/RecipesContext";
import Result from "../features/DietRecommendation/Results";

function Recipes() {
  const { data = [] } = useRecipes();

  return (
    <div className="flex flex-col w-full gap-3 px-4">
      <h2 className="text-4xl font-bold text-center md:text-start">
        Featured Recipes
      </h2>
      <p className="text-center text-gray-700 text-md md:text-start">
        Discover our collection of delicious, easy-to-follow recipes that will
        help you stay on track with your fitness goals.
      </p>
      <div className="relative w-full max-w-full mx-auto">
        <input
          placeholder="Search..."
          className="w-full px-5 py-3 border border-gray-300 shadow-sm outline-none rounded-xl transition-72"
          name="search"
          type="text"
          autoComplete="off"
        />
        <svg
          className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 top-1/2 right-4"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.slice(0, 6).map((dessert, index) => (
          <Result key={index} dessert={dessert} />
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
