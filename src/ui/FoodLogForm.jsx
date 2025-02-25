import { useState } from "react";

function FoodLogForm() {
  const [food, setFood] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ food, mealType, calories, carbs, protein, fat });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg">
      <h2 className="mb-4 text-xl font-semibold">Add Food Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              className="w-full p-2 border-b outline-none"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Meal Type
            </label>
            <select
              className="w-full p-2 border-b outline-none"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
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
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Carbs (g)
            </label>
            <input
              type="number"
              className="w-full p-2 border-b outline-none"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
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
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Fat (g)
            </label>
            <input
              type="number"
              className="w-full p-2 border-b outline-none"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-40 bg-[#16A34A] text-white p-2 rounded-lg hover:bg-[#1b8444]"
        >
          + Add Food
        </button>
      </form>
    </div>
  );
}

export default FoodLogForm;
