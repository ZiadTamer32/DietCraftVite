import { useState } from "react";
import { useDate } from "../../context/DateContext";
import IngredientsModal from "./IngredientsModal";
import FoodLogList from "./FoodLogList";
import FoodLogForm from "./FoodLogForm";
import useGetProgress from "./useGetProgress";
import useUser from "../auth/useUser";
import Spinner from "../../ui/Spinner";
import IngredientsLogList from "./IngredientsLogList";
import useGetFood from "./useGetFood";
import DatePicker from "../../ui/DatePicker";

function FoodLogs() {
  const [overlay, setOverlay] = useState(false);
  const { user } = useUser();
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );
  const { foodData, isPending: isFoodPending } = useGetFood(user?.email);
  const { selectedDate, setSelectedDate } = useDate();

  if (isProgressPending || isFoodPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 bg-gray-50">
      {/* Split Layout for Form and Calendar */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Food Entry Form */}
        <div className="w-full p-5 bg-white rounded-lg shadow-lg lg:w-3/4">
          <h2 className="mb-4 text-lg font-bold text-gray-800 md:text-xl">
            Add Food Entry
          </h2>
          <FoodLogForm setOverlay={setOverlay} email={user?.email} />
        </div>
        {/* Calendar */}
        <div className="w-full bg-white rounded-lg shadow-lg lg:w-1/4">
          <DatePicker
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
      </div>

      {/* Overlay for Ingredients */}
      {overlay && <IngredientsModal setOverlay={setOverlay} />}

      {/* Food Log List */}
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <FoodLogList foodLog={foodData} />
      </div>

      {/* Ingredients List */}
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <IngredientsLogList progressData={progressData} />
      </div>
    </div>
  );
}

export default FoodLogs;
