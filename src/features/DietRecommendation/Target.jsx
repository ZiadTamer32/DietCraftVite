/* eslint-disable react/prop-types */

import { useTarget } from "../../context/TargetContext";

/* eslint-disable no-unused-vars */
function Target({
  yourAge,
  yourHeight,
  yourWeight,
  yourBodyFat,
  yourGender,
  yourActivity,
  yourPlan
}) {
  const { data } = useTarget();
  const target = data ? data.map((e) => e) : [];
  // console.log(target[0]?.Bmi);
  console.log(target[0]?.Bmr.BMR.value);
  // console.log(target[0]?.Bmr);
  return (
    <div className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-[#f0fdf4] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">BMI</h3>
        <p className="text-[#16a34a] text-4xl font-bold">
          {target[0]?.Bmi.bmi} {target[0]?.Bmi.unit}
        </p>
        <p className="text-gray-600">{target[0]?.Bmi.bmiStatus}</p>
      </div>
      <div className="bg-[#faf5ff] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">BMR</h3>
        <p className="text-[#9333ea] text-4xl font-bold">
          {target[0]?.Bmr.BMR.value} {target[0]?.Bmr.BMR.unit}
        </p>
        <p className="text-gray-600">Daily Calorie BMR</p>
      </div>
      <div className="bg-[#eff6ff] p-5 rounded-lg flex flex-col gap-3">
        <h3 className="font-semibold">TDEE</h3>
        <p className="text-[#2563eb] text-4xl font-bold">
          {Math.ceil(target[0]?.Bmr.totalDailyCaloricNeeds.value)}{" "}
          {target[0]?.Bmr.totalDailyCaloricNeeds.unit}
        </p>
        <p className="text-gray-600">Total Daily Energy Expenditure</p>
      </div>
      <div className="flex flex-col gap-3 p-5 rounded-lg bg-teal-50">
        <h3 className="font-semibold">Target</h3>
        <p className="text-4xl font-bold text-teal-500">1611 kcal</p>
        <p className="text-gray-600">Daily Calorie Target</p>
      </div>
    </div>
  );
}

export default Target;
