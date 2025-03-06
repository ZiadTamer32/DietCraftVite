/* eslint-disable react/prop-types */
function SelectedIngredient({ setSelectedIngredient, selectedIngredient }) {
  const filteredFoods = [
    "Calcium, Ca",
    "Iron, Fe",
    "Vitamin B-6",
    "Carbohydrate, by difference",
    "Total lipid (fat)",
    "Protein",
    "Sodium, Na",
    "Potassium, K",
    "Energy"
  ];
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{selectedIngredient.description}</h2>
      <p className="text-gray-600">FDC ID: {selectedIngredient.fdcId}</p>
      <h3 className="mt-2 text-lg font-semibold">Nutrients:</h3>
      <ul className="text-gray-700 list-disc list-inside">
        {selectedIngredient.foodNutrients
          .filter((nutrient) => filteredFoods.includes(nutrient.nutrientName))
          .map((nutrient, index) => (
            <li key={index}>
              {/* <strong>ID:</strong> {nutrient.nutrientId} -{" "} */}
              <strong>nutrientName:</strong> {nutrient.nutrientName} -{" "}
              <strong>Value:</strong> {nutrient.value} -{" "}
              <strong>unitName:</strong> {nutrient.unitName}
            </li>
          ))}
      </ul>
      <button
        onClick={() => setSelectedIngredient(null)}
        className="px-4 py-2 mt-4 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
      >
        Back to Ingredients
      </button>
    </div>
  );
}

export default SelectedIngredient;
