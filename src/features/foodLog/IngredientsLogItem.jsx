/* eslint-disable react/prop-types */
import useDeleteIngredients from "./useDeleteIngredients";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
function IngredientsLogItem({ progress }) {
  const { deleteIngredients, isPending: isDeleting } = useDeleteIngredients();
  const [showDetails, setShowDetails] = useState({});
  const toggleDetails = (index) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return (
    <div className="flex items-center justify-between border-b max-sm:flex-col ">
      <div className="w-full py-2">
        <p className="text-xl font-semibold">
          {progress.mealName.charAt(0) +
            progress.mealName.slice(1).toLowerCase()}{" "}
          <button
            onClick={() => deleteIngredients(progress.IngredientsId)}
            disabled={isDeleting}
            className="text-sm text-black"
          >
            {isDeleting ? <SpinnerMini /> : <FiTrash2 />}
          </button>
        </p>
        <p className="text-sm text-gray-600">
          {progress.calories} kcal | {progress.carb}g Carbs | {progress.protein}
          g Protein | {progress.fat}g Fat{" "}
          {showDetails[progress.IngredientsId] && (
            <>
              | {progress.sugar} g Sugar | {progress.sodium} mg Sodium |{" "}
              {progress.cholesterol} mg Cholesterol | {progress.fiber} g Fiber
            </>
          )}
        </p>
      </div>
      <div className="flex items-center justify-end w-full gap-2 ">
        <button
          onClick={() => toggleDetails(progress.IngredientsId)}
          className="px-3 py-1 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          {showDetails[progress.IngredientsId] ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default IngredientsLogItem;
