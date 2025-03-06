import { useTarget } from "../../context/TargetContext";
import { useEffect, useState } from "react";

function Target() {
  const { data } = useTarget();
  const [savedData, setSavedData] = useState(() => {
    const storedData = localStorage.getItem("nutrationsData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("nutrationsData", JSON.stringify(data));
      setSavedData(data);
    }
  }, [data]);

  const displayData = savedData || data;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-[#f0fdf4] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">BMI</h3>
        <p className="text-[#16a34a] text-4xl font-bold">
          {Math.ceil(displayData?.Bmi?.bmi) || ""}{" "}
          {displayData?.Bmi?.unit || ""}
        </p>
        <p className="text-gray-600">{displayData?.Bmi?.bmiStatus || ""}</p>
      </div>
      <div className="bg-[#faf5ff] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">BMR</h3>
        <p className="text-[#9333ea] text-4xl font-bold">
          {Math.ceil(displayData?.Bmr?.BMR.value) || ""}{" "}
          {displayData?.Bmr?.BMR?.unit || ""}
        </p>
        <p className="text-gray-600">Daily Calorie BMR</p>
      </div>
      <div className="bg-[#eff6ff] p-5 rounded-lg flex flex-col gap-3 md:col-span-2 lg:col-span-1">
        <h3 className="font-semibold">TDEE</h3>
        <p className="text-[#2563eb] text-4xl font-bold">
          {Math.ceil(displayData?.Bmr?.totalDailyCaloricNeeds?.value) || ""}{" "}
          {displayData?.Bmr?.totalDailyCaloricNeeds?.unit || ""}
        </p>
        <p className="text-gray-600">Total Daily Energy Expenditure</p>
      </div>
    </div>
  );
}

export default Target;
