import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dietSubmission } from "../../services/apiDiet";
import toast from "react-hot-toast";

function useDiet() {
  const queryClient = useQueryClient();

  const { mutate: dietFn, isPending } = useMutation({
    mutationFn: dietSubmission,
    mutationKey: ["diet"],
    onSuccess: (data) => {
      queryClient.setQueryData(["diet"], data);
      toast.success("Diet recommendation added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return { dietFn, isPending };
}

export default useDiet;
