import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoBarbellOutline } from "react-icons/io5";
import { LiaCookieSolid } from "react-icons/lia";

import AverageCard from "../features/Progress/AverageCard";
import useGetFakeData from "../features/Progress/useGetFakeData";
import FilterCharts from "../ui/FilterCharts";
import DropdownMenu from "../ui/DropdownMenu";

const COLORS = ["#4CAF50", "#F59E0B", "#3B82F6", "#EF4444"];

function Progress() {
  function AverageValues(value) {
    const totalValues = fakeData?.map((log) => log[value]);
    const averageValues =
      totalValues?.reduce((acc, current) => acc + current, 0) /
      totalValues?.length;
    return parseFloat(averageValues.toFixed(2));
  }

  const filterList = ["overview", "calories", "macronutrients", "meals"];
  const [searchParams, setSearchParams] = useSearchParams();
  const { fakeData, isPending } = useGetFakeData();
  const filterData = searchParams.get("filterBy") || "overview";

  useEffect(() => {
    setSearchParams({ filterBy: filterData });
  }, [filterData, setSearchParams]);

  const dateAndCalories = fakeData?.map((item) => ({
    date: item.date,
    calories: item.calories,
  }));

  const caloriesByMeal = fakeData?.reduce((acc, log) => {
    const meal = log.meal;
    const existing = acc.find((m) => m.meal === meal);
    if (existing) existing.calories += log.calories;
    else acc.push({ meal, calories: log.calories });
    const resultCaloriesByMeal = acc.map((item) => ({
      ...item,
      calories: +item.calories.toFixed(2),
    }));
    return resultCaloriesByMeal;
  }, []);

  const macronutrientsRadar = fakeData?.reduce((acc, log) => {
    const meal = log.meal;
    const existing = acc.find((m) => m.meal === meal);
    if (existing) {
      existing.fat += log.fat;
      existing.carbohydrates += log.carbohydrates;
      existing.protein += log.protein;
    } else {
      acc.push({
        meal,
        fat: log.fat,
        carbohydrates: log.carbohydrates,
        protein: log.protein,
      });
    }
    return acc;
  }, []);

  const dailyMacros = fakeData?.map((log) => ({
    date: log?.date,
    fat: log?.fat,
    carbohydrates: log?.carbohydrates,
    protein: log?.protein,
  }));

  const macrosTotal = fakeData?.reduce(
    (acc, log) => {
      acc.fat += log?.fat;
      acc.carbohydrates += log?.carbohydrates;
      acc.protein += log?.protein;
      return acc;
    },
    { fat: 0, carbohydrates: 0, protein: 0 }
  );

  const macrosPieData = [
    { name: "Fat", value: +macrosTotal?.fat.toFixed(2) },
    { name: "Carbs", value: +macrosTotal?.carbohydrates.toFixed(2) },
    { name: "Protein", value: +macrosTotal?.protein.toFixed(2) },
  ];

  const macrosByMeal = fakeData?.reduce((acc, log) => {
    const meal = log.meal;
    const existing = acc.find((m) => m.meal === meal);
    if (existing) {
      existing.fat += +log.fat.toFixed(2);
      existing.carbohydrates += +log.carbohydrates.toFixed(2);
      existing.protein += +log.protein.toFixed(2);
    } else {
      acc.push({
        meal,
        fat: +log.fat.toFixed(2),
        carbohydrates: +log.carbohydrates.toFixed(2),
        protein: +log.protein.toFixed(2),
      });
    }

    return acc;
  }, []);

  const chartsConfig = [
    {
      id: "1",
      category: "calories",
      title: "Daily Calorie Trend",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dateAndCalories}>
            <XAxis dataKey="date" stroke="black" />
            <YAxis stroke="black" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "2",
      category: "calories",
      title: "Total Calories per Meal Type",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={caloriesByMeal}>
            <XAxis dataKey="meal" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "3",
      category: "macronutrients",
      title: "Radar: Avg Macronutrients per Meal",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={macronutrientsRadar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="meal" />
            <PolarRadiusAxis />
            <Radar
              name="Fat"
              dataKey="fat"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.6}
            />
            <Radar
              name="Carbs"
              dataKey="carbohydrates"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.6}
            />
            <Radar
              name="Protein"
              dataKey="protein"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "4",
      category: "macronutrients",
      title: "Stacked Bar: Daily Macronutrients",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyMacros} stackOffset="sign">
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fat" stackId="a" fill="#EF4444" />
            <Bar dataKey="carbohydrates" stackId="a" fill="#3B82F6" />
            <Bar dataKey="protein" stackId="a" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "5",
      category: "macronutrients",
      title: "Macronutrients % Distribution (Week)",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={macrosPieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {macrosPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "6",
      category: "meals",
      title: "Meal-wise Macronutrients",
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={macrosByMeal}>
            <XAxis dataKey="meal" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fat" stackId="a" fill="#EF4444" />
            <Bar dataKey="carbohydrates" stackId="a" fill="#3B82F6" />
            <Bar dataKey="protein" stackId="a" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <div className="p-4 text-black transition-all duration-300 bg-white rounded-lg md:p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          DietCraft Progress
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 py-5 md:grid-cols-2 lg:grid-cols-4">
        <AverageCard
          AverageName="Average Calories"
          AverageNumber={`${AverageValues("calories")} kcal`}
          isPending={isPending}
          icon={<MdOutlineLocalFireDepartment size={20} />}
        />
        <AverageCard
          AverageName="Average Protein"
          AverageNumber={`${AverageValues("protein")} g`}
          isPending={isPending}
          icon={<IoBarbellOutline size={20} />}
        />
        <AverageCard
          AverageName="Average Carbs"
          AverageNumber={`${AverageValues("carbohydrates")} g`}
          isPending={isPending}
          icon={<LiaCookieSolid size={20} />}
        />
        <AverageCard
          AverageName="Average Fat"
          AverageNumber={`${AverageValues("fat")} g`}
          isPending={isPending}
          icon={<MdOutlineLocalFireDepartment size={20} />}
        />
      </div>

      <div className="pb-5">
        <ul className="hidden md:flex flex-wrap bg-[#f5f5f5] gap-5 rounded-lg w-fit max-md:justify-between max-md:w-full p-1 text-gray-500">
          {filterList.map((item, index) => {
            const isActive = item === filterData;
            return (
              <li
                key={index}
                onClick={() => setSearchParams({ filterBy: item })}
                className={`px-4 py-2 cursor-pointer rounded-lg text-sm ${
                  isActive ? "text-black bg-white" : "text-[#4b5563]"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            );
          })}
        </ul>
        <DropdownMenu
          filterData={filterData}
          filterList={filterList}
          setSearchParams={setSearchParams}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {chartsConfig.map(
          ({ id, title, category, component }) =>
            (filterData === category || filterData === "overview") && (
              <FilterCharts key={id} title={title}>
                {component}
              </FilterCharts>
            )
        )}
      </div>
    </div>
  );
}

export default Progress;
