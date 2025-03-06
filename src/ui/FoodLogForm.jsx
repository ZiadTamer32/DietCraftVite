import { useReducer, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
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
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full max-w-6xl p-5 mx-auto bg-white rounded-lg md:shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Add Food Entry</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Food Name
              </label>
              <input
                type="text"
                className="w-full p-2 border-b outline-none"
                {...register("food", { required: "Food name is required" })}
              />
              {errors.food && (
                <p className="text-sm text-red-500">{errors.food.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Meal Type
              </label>
              <select
                className="w-full p-2 border-b outline-none"
                {...register("mealType")}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Calories
              </label>
              <input
                type="number"
                className="w-full p-2 border-b outline-none"
                {...register("calories", { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Carbs (g)
              </label>
              <input
                type="number"
                className="w-full p-2 border-b outline-none"
                {...register("carbs", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Protein (g)
              </label>
              <input
                type="number"
                className="w-full p-2 border-b outline-none"
                {...register("protein", { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Fat (g)
              </label>
              <input
                type="number"
                className="w-full p-2 border-b outline-none"
                {...register("fat", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full gap-4 md:flex-nowrap">
            <button
              type="submit"
              className="flex items-center justify-center w-full gap-2 p-2 text-white bg-green-600 rounded-lg md:w-40 hover:bg-green-700"
            >
              <FiPlusCircle size={18} /> Add Food
            </button>
            <button
              type="button"
              onClick={() => setOverlay((e) => !e)}
              className="flex items-center justify-center w-full gap-2 p-2 text-white bg-green-600 rounded-lg md:w-40 hover:bg-green-700"
            >
              <FiPlusCircle size={18} /> Add Ingredients
            </button>
          </div>
        </form>
      </div>
      {overlay && <IngredientsFood setOverlay={setOverlay} />}
      <div className="w-full max-w-6xl p-3 mx-auto bg-white rounded-lg shadow-lg sm:p-5">
        <h4 className="text-2xl font-semibold">Log your meals</h4>
        {foodLog.length === 0 ? (
          <p>No food entries yet. Start adding your meals!</p>
        ) : (
          <div>
            {foodLog.map((log, index) => (
              <FoodLogItem
                key={index}
                log={log}
                onRemove={() => dispatch({ type: "REMOVE", payload: log.id })}
              />
            ))}
            <div className="flex justify-end w-full">
              <button
                onClick={() => dispatch({ type: "CLEAR" })}
                className="flex items-center gap-2 p-2 mt-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
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
