import { FiTrash2 } from "react-icons/fi";

/* eslint-disable react/prop-types */
function FoodLogItem({ log, onRemove }) {
  return (
    <div className="flex items-center justify-between border-b max-sm:flex-col">
      <div className="w-full py-2">
        <p className="text-xl font-semibold">
          {log.food}{" "}
          <button
            onClick={() => onRemove(log.id)}
            className="text-sm text-black"
          >
            <FiTrash2 />
          </button>
        </p>
        <p className="text-sm text-gray-600">
          {log.calories} kcal | {log.carbs}g Carbs | {log.protein}g Protein |{" "}
          {log.fat}g Fat
        </p>
      </div>
      <div className="flex gap-2 max-sm:w-full max-sm:justify-between max-sm:pb-2">
        <span className="px-3 py-1 text-white bg-green-600 rounded-full">
          {log.mealType}
        </span>
      </div>
    </div>
  );
}

export default FoodLogItem;
