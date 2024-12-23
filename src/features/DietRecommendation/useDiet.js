import { useMutation } from "@tanstack/react-query";
import { dietSubmission } from "../../services/apiDiet";
import toast from "react-hot-toast";

function useDiet() {
  const { mutate: dietFn, isPending } = useMutation({
    mutationFn: dietSubmission,
    onSuccess: () => {
      toast.success(" Generated Sucessfully !");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  return { dietFn, isPending };
}

export default useDiet;
