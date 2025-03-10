/* eslint-disable react/prop-types */
import { useState } from "react";
import useUser from "../auth/useUser";
import useAddMeal from "./useAddMeal";
import SpinnerMini from "../../ui/SpinnerMini";

function SelectedIngredient({
  setSelectedIngredient,
  selectedIngredient,
  setOverlay
}) {
  const [servings, setServings] = useState(1);
  const { user } = useUser();
  const { addMealFn, isPending } = useAddMeal();

  const filteredFoods = {
    1008: "Calories",
    1004: "Total Fat",
    1093: "Sodium",
    1005: "Total Carbs",
    1003: "Protein",
    1063: "Sugar",
    1079: "Fiber",
    1253: "Cholesterol"
  };
  // Convert the following code to use the filteredFoods object {1008: "Calories", ...}
  const handleFilter = selectedIngredient.foodNutrients.filter((nutrient) =>
    Object.keys(filteredFoods).includes(nutrient.nutrientId.toString())
  );
  // Acess the filteredFoods object to get the nutrient name , value and unit {name: "Calories", value: 0, unit: "g"}
  const handleNameAndValue = handleFilter.map((nutrient) => ({
    name: filteredFoods[nutrient.nutrientId],
    value: ((nutrient.value / 100) * servings).toFixed(2),
    unit: nutrient.unitName.toLowerCase()
  }));
  // to match names from schema DataBase
  const nutrientKeyMap = {
    Calories: "calories",
    "Total Fat": "fat",
    Sodium: "sodium",
    "Total Carbs": "carb",
    Protein: "protein",
    Sugar: "sugar",
    Fiber: "fiber",
    Cholesterol: "cholesterol"
  };
  // Create an object with the nutrient name and value [calories, 0 , fat, 0, ...] --> {calories: 0, fat: 0, ...}
  const initialNutrients = Object.fromEntries(
    Object.values(nutrientKeyMap).map((key) => [key, 0])
  );
  // Convert the following code to use the nutrientKeyMap object {calories: 220, fat: 10, ...}
  const nutrientsObject = handleNameAndValue.reduce(
    (acc, nutrient) => {
      const key = nutrientKeyMap[nutrient.name];
      if (key) acc[key] = parseFloat(nutrient.value);
      return acc;
    },
    { ...initialNutrients }
  );

  const handleServingsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) setServings(value);
  };

  function handleAddToDiary(meal) {
    if (!selectedIngredient) return;
    addMealFn(
      {
        ...meal,
        mealName: selectedIngredient.description,
        email: user.email,
        IngredientsId: Date.now()
      },
      {
        onSuccess: () => {
          setOverlay(false);
        }
      }
    );
  }

  return (
    <div className="w-full p-3 mx-auto rounded-lg shadow-md md:p-6 bg-gray-50">
      <h2 className="mb-4 text-2xl font-bold">
        {selectedIngredient.description}
      </h2>

      <div className="flex items-center mb-4">
        <label className="mr-2 font-semibold text-l">Servings:</label>
        <input
          type="number"
          value={servings}
          onChange={handleServingsChange}
          className="w-20 px-2 py-1 text-center border rounded-md"
        />
        <input
          type="text"
          value="1g"
          disabled
          className="w-full px-2 py-1 ml-2 text-center bg-white border rounded-md sm:w-28"
        />
      </div>

      <h2 className="mb-4 font-bold text-l">Nutrients:</h2>

      <div className="grid w-full grid-cols-1 p-3 text-gray-700 bg-white rounded-lg shadow md:p-6 gap-y-3 gap-x-6 md:grid-cols-2">
        {handleNameAndValue.map(({ name, value, unit }) => (
          <div key={name} className="flex justify-between p-2 border-b md:p-4">
            <span className="font-semibold">{name}</span>
            <span>
              {parseFloat(value)} {unit}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <button
          onClick={() => setSelectedIngredient(null)}
          className="px-4 py-2 text-white bg-green-500 rounded-lg max-sm:w-full hover:bg-green-600"
        >
          Back to Ingredients
        </button>
        <button
          onClick={() => handleAddToDiary(nutrientsObject)}
          disabled={isPending}
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg max-sm:w-full hover:bg-blue-600"
        >
          {isPending ? <SpinnerMini /> : "Add to Diary"}
        </button>
      </div>
    </div>
  );
}

export default SelectedIngredient;
