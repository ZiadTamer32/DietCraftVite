import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useUser from "../features/auth/useUser";
import useMeals from "../features/DietRecommendation/useMeals";
import Meals from "../features/DietRecommendation/Meals";

function RecipeDays() {
  const { numWeek, numDay } = useParams();
  const { user } = useUser();
  const email = user?.user_metadata?.email;

  // Pass the email to the useMeals hook
  const { meals, isPending } = useMeals(email);

  // Handle loading and error states
  if (!user) return <p>You must log in first.</p>;
  if (isPending) return <Spinner />;
  if (!meals || meals.length === 0) return <p>No meals found.</p>;

  // Validate numWeek and numDay
  const isValidWeek = numWeek >= 1 && numWeek <= 4;
  const isValidDay = numDay >= 1 && numDay <= 7;

  if (!isValidWeek || !isValidDay) {
    return <p>Invalid week or day.</p>;
  }

  // Get the number of meals
  const mealsLength = meals[0]?.numMeals || 3;

  return (
    <div className="bg-gradient-to-tl from-[#02120d] to-[#095c43] text-white">
      <h2 className="pt-5 text-2xl font-bold text-center md:text-4xl ">
        Recipe for Week {numWeek}, Day {numDay}
      </h2>
      <Meals mealsLength={mealsLength} />
    </div>
  );
}

export default RecipeDays;
