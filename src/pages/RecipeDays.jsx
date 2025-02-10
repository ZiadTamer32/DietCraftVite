import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useUser from "../features/auth/useUser";
import useMeals from "../features/DietRecommendation/useMeals";

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
  const mealsLength = meals[0]?.numMeals || 0;

  return (
    <div>
      <h1>
        Week-{numWeek} Day-{numDay}
      </h1>
      <ul>
        {Array.from({ length: mealsLength }).map((_, index) => (
          <li key={index}>Recipe {index + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDays;
