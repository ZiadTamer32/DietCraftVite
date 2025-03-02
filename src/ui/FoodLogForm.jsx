import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import IngredientsFood from "./IngredientsFood";

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
  const [overlay, serOverlay] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    reset(); // Reset form after submission
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white rounded-lg">
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

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-fit flex gap-2 items-center justify-center bg-[#16A34A] text-white p-2 rounded-lg hover:bg-[#1b8444]"
            >
              <FiPlusCircle size={18} /> Add Food
            </button>
            <button
              type="button"
              onClick={() => serOverlay((e) => !e)}
              className="w-fit flex gap-2 items-center justify-center bg-[#16A34A] text-white p-2 rounded-lg hover:bg-[#1b8444]"
            >
              <FiPlusCircle size={18} /> Add Ingredients
            </button>
          </div>
        </form>
      </div>
      {overlay && <IngredientsFood serOverlay={serOverlay} />}
    </div>
  );
}

export default FoodLogForm;
