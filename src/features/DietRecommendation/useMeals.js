import { useQuery } from "@tanstack/react-query";
import { fetchMealsByEmail } from "../../services/apiDiet";
import toast from "react-hot-toast";

function useMeals(email) {
  const { data: meals, isPending } = useQuery({
    queryFn: () => fetchMealsByEmail(email),
    queryKey: ["meals", email],
    enabled: !!email, // Only run the query if email is available
    onSuccess: () => {
      toast.success("Fetched meals successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch meals.");
    }
  });

  return { meals, isPending };
}

export default useMeals;
