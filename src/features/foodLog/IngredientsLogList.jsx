/* eslint-disable react/prop-types */
import { useDate } from "../../context/DateContext";
import IngredientsLogItem from "./IngredientsLogItem";
import useFilteredAndSortedLogs from "./useFilteredAndSortedLogs";

function IngredientsLogList({ progressData }) {
  const { selectedDate } = useDate();
  const sortedFoodLog = useFilteredAndSortedLogs(progressData, selectedDate);
  return (
    <div className="w-full px-2 mx-auto bg-white rounded-lg max-w-8xl">
      {sortedFoodLog?.length > 0 ? (
        <ul className="space-y-4">
          {sortedFoodLog.map((progress, index) => (
            <IngredientsLogItem key={index} progress={progress} />
          ))}
        </ul>
      ) : (
        <div>
          <h4 className="mb-3 text-2xl font-bold text-gray-800">
            Log Your Ingredients
          </h4>
          <p className="text-gray-600">
            No ingredients entries yet. Start adding your ingredients!
          </p>
        </div>
      )}
    </div>
  );
}

export default IngredientsLogList;
