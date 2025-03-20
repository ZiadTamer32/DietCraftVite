/* eslint-disable react/prop-types */
import NutritionLogItem from "../../ui/NutritionLogItem";
import useDeleteFood from "./useDeleteFood";
function FoodLogList({ foodLog }) {
  const { deleteFood, isPending: isDeletePending } = useDeleteFood();
  return (
    <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
      {foodLog.length === 0 ? (
        <>
          <h4 className="mb-2 text-2xl font-bold text-gray-800">
            Log Your Meals
          </h4>
          <p className="text-gray-600">
            No food entries yet. Start adding your meals!
          </p>
        </>
      ) : (
        <div className="space-y-4">
          {foodLog.map((log, index) => (
            <NutritionLogItem
              key={index}
              id={log.id}
              name={log.food}
              mealType={log.mealType}
              calories={log.calories}
              carbs={log.carbs}
              protein={log.protein}
              fat={log.fat}
              sugar={log.sugar}
              sodium={log.sodium}
              cholesterol={log.cholesterol}
              fiber={log.fiber}
              onDelete={() => {
                deleteFood(log.mealId);
              }}
              isDeleting={isDeletePending ? true : false}
              showDetailsButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodLogList;
