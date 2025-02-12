import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";
import Result from "../features/DietRecommendation/Results";

function Recipes() {
  const { data = [] } = useRecipes();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-5 space-y-4">
      {data.slice(0, 10).map((dessert, index) => (
        <div
          key={dessert.RecipeId}
          className="border border-gray-200 rounded-lg"
        >
          <button
            onClick={() => toggleCollapse(index)}
            className="flex items-center justify-between w-full p-4 font-medium text-gray-700 border-b border-gray-200 hover:bg-gray-100"
          >
            <span>{dessert.Name}</span>
            <svg
              className={`w-4 h-4 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="p-4">
              <Result dessert={dessert} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Recipes;
