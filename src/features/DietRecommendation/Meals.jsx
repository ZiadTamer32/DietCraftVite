/* eslint-disable react/prop-types */
import { GiMeal } from "react-icons/gi";
import { useRecipes } from "../../context/RecipesContext";
import { useState } from "react";
import Result from "../../features/DietRecommendation/Results";
import Spinner from "../../ui/Spinner";

function Meals({ mealsLength }) {
  const { data, isLoading } = useRecipes();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let meals;
  if (mealsLength === 3) meals = ["Breakfast", "Lunch", "Dinner"];
  if (mealsLength === 4)
    meals = ["Breakfast", "Morning Snack", "Lunch", "Dinner"];
  if (mealsLength === 5)
    meals = [
      "Breakfast",
      "Morning Snack",
      "Lunch",
      "Afternoon Snack",
      "Dinner"
    ];

  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-6 px-5 py-5 lg:grid-cols-3 md:grid-cols-2 ">
      {meals.map((meal, mealIndex) => {
        const start = mealIndex * 10;
        const end = start + 10;
        return (
          <div key={mealIndex}>
            <div className="relative space-y-3 overflow-hidden border border-gray-200 p-7">
              <div className="absolute w-24 h-24 rounded-full bg-[#226c56] -right-5 -top-7">
                <p className="absolute text-2xl text-white bottom-6 left-7">
                  0{mealIndex + 1}
                </p>
              </div>
              <h1 className="flex items-center gap-3 text-xl font-bold">
                <GiMeal size={40} /> {meal}
              </h1>
              {data.slice(start, end).map((dessert) => (
                <div key={dessert.RecipeId} className="border border-gray-200">
                  <button
                    onClick={() => toggleCollapse(dessert.RecipeId)}
                    className="flex items-center justify-between w-full p-4 font-medium border-b border-gray-200"
                  >
                    <span>{dessert.Name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openIndex === dessert.RecipeId ? "rotate-180" : ""
                      }`}
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
                  {openIndex === dessert.RecipeId && (
                    <div className="p-4">
                      <Result dessert={dessert} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Meals;
