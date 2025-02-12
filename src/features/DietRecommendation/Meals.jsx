/* eslint-disable react/prop-types */
import { useState } from "react";
import { GiMeal } from "react-icons/gi";
import { useRecipes } from "../../context/RecipesContext";
import Spinner from "../../ui/Spinner";

function Meals({ mealsLength }) {
  const { data, isLoading } = useRecipes();

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

  // Slice the first 10 items of the data
  const slicedData = data.slice(0, 5);
  // Check if data is loaded before rendering
  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 gap-6 px-5 lg:grid-cols-3 md:grid-cols-2">
      {meals.map((meal, index) => (
        <MealCollapse
          key={index}
          meal={meal}
          slicedData={slicedData}
          index={index}
        />
      ))}
    </div>
  );
}

function MealCollapse({ meal, slicedData, index }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (itemIndex) => {
    setActiveIndex(activeIndex === itemIndex ? null : itemIndex); // Toggle the active index
  };

  return (
    <div className="pb-5">
      <div className="relative space-y-3 overflow-hidden border border-gray-200 p-7">
        <div className="absolute w-24 h-24 rounded-full bg-[#095c43] -right-5 -top-7">
          <p className="absolute text-2xl text-white bottom-6 left-7">
            0{index + 1}
          </p>
        </div>
        <h1 className="flex items-center gap-3 text-xl font-bold text-[#074a36]">
          <GiMeal size={40} /> {meal?.toUpperCase()}
        </h1>
        <div id={`accordion-collapse-${index}`} className="accordion">
          {slicedData.map((item, itemIndex) => (
            <div key={itemIndex}>
              <h2 id={`accordion-collapse-heading-${itemIndex}`}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200"
                  onClick={() => handleToggle(itemIndex)} // Trigger collapse toggle
                >
                  <span>{item.Name}</span>
                  <svg
                    className={`w-3 h-3 shrink-0 ${activeIndex === itemIndex ? "rotate-180" : ""}`}
                    aria-hidden="true"
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
              </h2>
              <div
                id={`accordion-collapse-body-${itemIndex}`}
                className={`transition-all duration-300 ease-in-out ${activeIndex === itemIndex ? "block" : "hidden"}`}
                aria-labelledby={`accordion-collapse-heading-${itemIndex}`}
              >
                <div className="p-5 border border-gray-200">
                  <p className="mb-2 text-gray-500">{item.Name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Meals;
