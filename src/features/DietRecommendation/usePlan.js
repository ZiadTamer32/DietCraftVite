import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataByEmail } from "../../services/apiDiet";
import toast from "react-hot-toast";

function usePlan(email) {
  const queryClient = useQueryClient();

  const { data: plan, isPending: isPlanning } = useQuery({
    queryKey: ["plan"],
    queryFn: () => fetchDataByEmail(email), // Pass email to the query function
    enabled: !!email, // Only run the query if email is available
    onSuccess: (data) => {
      queryClient.setQueryData(["plan", email], (prev) => ({
        ...(prev || {}), // Handle case where prev is undefined
        ...data
      }));
      toast.success("Fetched plan successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch plan.");
    }
  });

  return { plan, isPlanning };
}

export default usePlan;
