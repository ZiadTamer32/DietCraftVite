import { useMutation } from "@tanstack/react-query";
import { addMeal } from "../../services/apiProgress";
import toast from "react-hot-toast";

function useAddMeal() {
  const { mutate: addMealFn, isPending } = useMutation({
    mutationKey: ["progressData"],
    mutationFn: addMeal,
    onSuccess: () => {
      toast.success("Meal added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add Meal: " + error.message);
    },
  });
  return { addMealFn, isPending };
}

export default useAddMeal;
