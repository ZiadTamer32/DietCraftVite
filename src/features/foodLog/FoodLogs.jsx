import { useState } from "react";
import IngredientsModal from "./IngredientsModal";
import FoodLogList from "./FoodLogList";
import FoodLogForm from "./FoodLogForm";
import useGetProgress from "./useGetProgress";
import useUser from "../auth/useUser";
import Spinner from "../../ui/Spinner";
import IngredientsLogList from "./IngredientsLogList";
import useGetFood from "./useGetFood";

function FoodLogs() {
  const [overlay, setOverlay] = useState(false);
  const { user } = useUser();
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );
  const { foodData, isPending: isFoodPending } = useGetFood(user?.email);

  if (isProgressPending || isFoodPending) return <Spinner />;
  return (
    <div className="flex flex-col gap-5 bg-gray-50">
      {/* Food Entry Form */}
      <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add Food Entry
        </h2>
        <FoodLogForm setOverlay={setOverlay} email={user?.email} />
      </div>

      {/* Overlay for Ingredients */}
      {overlay && <IngredientsModal setOverlay={setOverlay} />}

      {/* Food Log List */}
      <div className="w-full p-3 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <FoodLogList foodLog={foodData} />
      </div>

      {/* Ingredients List */}
      <div className="w-full p-3 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
        <IngredientsLogList progressData={progressData} />
      </div>
    </div>
  );
}

export default FoodLogs;
