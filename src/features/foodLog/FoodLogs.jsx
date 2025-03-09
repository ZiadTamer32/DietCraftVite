import { useReducer, useState } from "react";
import IngredientsFood from "./IngredientsFood";
import FoodLogList from "./FoodLogList";
import FoodLogForm from "./FoodLogForm";
import useGetProgress from "./useGetProgress";
import useUser from "../auth/useUser";
import Spinner from "../../ui/Spinner";

const foodReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((log) => log.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

function FoodLogs() {
  const [overlay, setOverlay] = useState(false);
  const [foodLog, dispatch] = useReducer(foodReducer, []);
  const { user } = useUser();
  const { progressData, isPending } = useGetProgress(user?.email);
  if (isPending) return <Spinner />;
  return (
    <div className="flex flex-col min-h-screen gap-5 rounded-lg md:p-4 bg-gray-50">
      {/* Food Entry Form */}
      <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add Food Entry
        </h2>
        {/* Form */}
        <FoodLogForm dispatch={dispatch} setOverlay={setOverlay} />
      </div>
      {/* Overlay for Ingredients */}
      {overlay && <IngredientsFood setOverlay={setOverlay} />}
      {/* Food Log List */}
      <FoodLogList foodLog={foodLog} dispatch={dispatch} />
      {/* Ingredients List */}
      <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        {progressData?.length !== 0 ? (
          progressData?.map((progress, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-between border-b max-sm:flex-col">
                  <div className="w-full py-2">
                    <p className="text-xl font-semibold">{progress.mealName}</p>
                    <p className="text-sm text-gray-600">
                      {progress.calories} kcal | {progress.carb}g Carbs |{" "}
                      {progress.protein}g Protein | {progress.fat}g Fat |{" "}
                      {progress.sugar} g Sugar | {progress.sodium} mg Sodium |{" "}
                      {progress.cholesterol} mg Cholesterol | {progress.fiber} g
                      Fiber
                    </p>
                  </div>
                  <div>
                    <button className="px-3 py-1 text-white bg-red-500 rounded-full hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <h4 className="mb-4 text-2xl font-bold text-gray-800">
              Log Your Ingredients
            </h4>
            <p className="text-gray-600">
              No ingredients entries yet. Start adding your meals!
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default FoodLogs;
