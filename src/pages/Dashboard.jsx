import { FaUtensils, FaCalculator } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../features/auth/useUser";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { FiSearch } from "react-icons/fi";
import Card from "../ui/Card";
import useGetTarget from "../features/DietRecommendation/useGetTarget";
import Spinner from "../ui/Spinner";
import useGetFood from "../features/foodLog/useGetFood";
import RecentLog from "../features/Dashboard/RecentLog";
import WaterTracker from "../features/Dashboard/WaterTracker";
import useGetProgress from "../features/foodLog/useGetProgress";
import {
  getRecentMeals,
  summarizeTodaysMeals
} from "../features/Dashboard/RecentCalc";

function Dashboard() {
  const { user, isAuthenticated } = useUser();
  const { getTarget, isPending } = useGetTarget(user?.email);
  const { foodData, isPending: isFoodPending } = useGetFood(user?.email);
  const { progressData, isPending: isProgressPending } = useGetProgress(
    user?.email
  );
  const meals = [
    ...(Array.isArray(foodData) ? foodData : []),
    ...(Array.isArray(progressData) ? progressData : [])
  ];

  const { totals, todaysMeals } = summarizeTodaysMeals(meals);
  const recentMeals = getRecentMeals(todaysMeals, 3);

  const Name =
    user?.user_metadata?.firstName + " " + user?.user_metadata?.lastName;

  const progress = { current: 50, target: 100 };

  const weeklySummary = {
    totalCalories: 8400,
    totalWorkouts: 5,
    averageWaterIntake: 2.5,
    weightChange: -1.2
  };

  const PlaceHolderprogressData = [
    { week: "Week 1", progress: 20 },
    { week: "Week 2", progress: 40 },
    { week: "Week 3", progress: 60 },
    { week: "Week 4", progress: 80 }
  ];

  const dailyTips = [
    "Drink a glass of water before every meal to help control portion sizes.",
    "Aim for at least 30 minutes of physical activity every day.",
    "Include a variety of colorful fruits and vegetables in your meals.",
    "Track your progress regularly to stay motivated.",
    "Start your day with a high-protein breakfast to stay full longer.",
    "Get at least 7-9 hours of sleep each night for better overall health.",
    "Limit processed foods and opt for whole, natural ingredients instead.",
    "Practice mindful eating—slow down and savor each bite.",
    "Take short breaks from sitting every hour to stretch and move.",
    "Drink herbal tea instead of sugary beverages to stay hydrated.",
    "Plan your meals ahead to make healthier choices throughout the week.",
    "Reduce screen time before bed to improve sleep quality.",
    "Engage in deep breathing exercises to reduce stress and anxiety.",
    "Swap refined grains for whole grains like brown rice and quinoa.",
    "Use smaller plates to help control portion sizes naturally.",
    "Choose lean protein sources like fish, chicken, and plant-based proteins.",
    "Snack on nuts and seeds for a boost of healthy fats and energy.",
    "Get fresh air and natural sunlight daily to improve mood and vitamin D levels.",
    "Prioritize mental health by practicing gratitude and positive thinking."
  ];
  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  // Loading State
  if (isPending || isFoodPending || isProgressPending) return <Spinner />;

  return (
    <main className="p-5">
      {/* Welcome Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="mb-3 text-xl font-bold text-gray-800 sm:text-3xl">
          Welcome back, {isAuthenticated ? Name : "User"}!
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Keep up the great work on your fitness journey.
        </p>
        <div className="p-4 mt-4 rounded-lg bg-green-50">
          <p className="text-sm text-green-700">💡 Daily Tip: {randomTip}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {/* Today Calories */}
        <Card className="col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Today&apos;s Nutritions
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Calories</span>
            <span className="font-medium">
              {Math.ceil(totals.calories)}{" "}
              {getTarget[0]?.Bmr?.totalDailyCaloricNeeds?.unit} /{" "}
              {Math.ceil(getTarget[0]?.Bmr?.totalDailyCaloricNeeds?.value)}{" "}
              {getTarget[0]?.Bmr?.totalDailyCaloricNeeds?.unit}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Protein</span>
              <span>
                {Math.ceil(totals.protein)}
                {getTarget[0]?.Bmr?.protein?.unit} /{" "}
                {Math.ceil(getTarget[0]?.Bmr?.protein?.preferred)}
                {getTarget[0]?.Bmr?.protein?.unit}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Carbs</span>
              <span>
                {Math.ceil(totals.carb)}
                {getTarget[0]?.Bmr?.carbohydrates?.unit} /{" "}
                {Math.ceil(getTarget[0]?.Bmr?.carbohydrates?.preferred)}
                {getTarget[0]?.Bmr?.carbohydrates?.unit}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fat</span>
              <span>
                {Math.ceil(totals.fat)}
                {getTarget[0]?.Bmr?.fat?.unit} /{" "}
                {Math.ceil(getTarget[0]?.Bmr?.fat?.preferred)}
                {getTarget[0]?.Bmr?.fat?.unit}
              </span>
            </div>
          </div>
        </Card>
        {/* Water Tracker */}
        <WaterTracker />
      </div>

      {/* Weekly Summary */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Weekly Summary
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Calories
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {weeklySummary.totalCalories} kcal
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Workouts
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {weeklySummary.totalWorkouts}
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Avg. Water Intake
            </h3>
            <p className="text-2xl font-bold text-purple-600">
              {weeklySummary.averageWaterIntake}L/day
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Weight Change
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {weeklySummary.weightChange} kg
            </p>
          </div>
        </div>
      </div>

      {/* Goals and Progress */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Progress</h2>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">
            Monthly Goal: {progress.current}% Complete
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progress.current}%` }}
            ></div>
          </div>
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={PlaceHolderprogressData}>
                <XAxis dataKey="week" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${recentMeals.length > 0 ? "mb-8" : ""}`}>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            to="/food-log"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-green-50"
          >
            <FaUtensils className="text-green-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Log a Meal
            </span>
          </Link>
          <Link
            to="/diet-recommendation"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50"
          >
            <FaCalculator className="text-blue-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Calculator
            </span>
          </Link>
          <Link
            to="/browse-foods"
            className="flex items-center justify-center gap-2 p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50"
          >
            <FiSearch className="text-orange-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Explore Recipes
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Nutrition Log */}
      {recentMeals.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Nutrition Log
            </h2>
          </div>

          <div className="space-y-4">
            {recentMeals?.map((meal) => (
              <RecentLog key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
