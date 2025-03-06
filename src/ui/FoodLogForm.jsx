import { useReducer, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import IngredientsFood from "./IngredientsFood";
import FoodLogItem from "./FoodLogItem";

const foodReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

function FoodLogForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      food: "",
      mealType: "Breakfast",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    }
  });

  const [overlay, setOverlay] = useState(false);
  const [foodLog, dispatch] = useReducer(foodReducer, [], () => {
    const savedData = localStorage.getItem("foodLogData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodLogData", JSON.stringify(foodLog));
  }, [foodLog]);

  const onSubmit = (data) => {
    dispatch({ type: "ADD", payload: { ...data, id: Date.now().toString() } });
    reset();
    toast.success("Food entry added successfully!");
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR" });
    toast("All food entries cleared.", {
      icon: <FiTrash2 size={18} />
    });
  };

  return (
    <div className="flex flex-col min-h-screen gap-5 p-4 rounded-lg bg-gray-50">
      {/* Food Entry Form */}
      <div className="w-full max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add Food Entry
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Food Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Food Name
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg outline-none ${
                  errors.food ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter food name"
                {...register("food", { required: "Food name is required" })}
              />
              {errors.food && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.food.message}
                </p>
              )}
            </div>

            {/* Meal Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Meal Type
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                {...register("mealType")}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Calories */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Calories (kcal)
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                placeholder="Enter calories"
                {...register("calories", { valueAsNumber: true })}
              />
            </div>

            {/* Carbs */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Carbs (g)
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                placeholder="Enter carbs"
                {...register("carbs", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Protein */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Protein (g)
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                placeholder="Enter protein"
                {...register("protein", { valueAsNumber: true })}
              />
            </div>

            {/* Fat */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Fat (g)
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                placeholder="Enter fat"
                {...register("fat", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="flex items-center justify-center w-full gap-2 p-3 text-white transition-transform transform bg-green-600 rounded-lg md:w-48 hover:bg-green-700"
            >
              <FiPlusCircle size={18} /> Add Food
            </button>
            <button
              type="button"
              onClick={() => setOverlay(true)}
              className="flex items-center justify-center w-full gap-2 p-3 text-white transition-transform transform bg-blue-600 rounded-lg md:w-48 hover:bg-blue-700"
            >
              <FiPlusCircle size={18} /> Add Ingredients
            </button>
          </div>
        </form>
      </div>

      {/* Overlay for Ingredients */}
      {overlay && <IngredientsFood setOverlay={setOverlay} />}

      {/* Food Log List */}
      <div className="w-full max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h4 className="mb-6 text-2xl font-bold text-gray-800">
          Log Your Meals
        </h4>
        {foodLog.length === 0 ? (
          <p className="text-gray-600">
            No food entries yet. Start adding your meals!
          </p>
        ) : (
          <div className="space-y-4">
            {foodLog.map((log, index) => (
              <FoodLogItem
                key={index}
                log={log}
                onRemove={() => {
                  dispatch({ type: "REMOVE", payload: log.id });
                  toast("Food entry removed.");
                }}
              />
            ))}
            <div className="flex justify-end">
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 p-3 text-white transition-transform transform bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105"
              >
                <FiTrash2 size={18} /> Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodLogForm;
