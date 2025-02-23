import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dietSubmission } from "../../services/apiDiet";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function useDiet() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: dietFn, isPending } = useMutation({
    mutationFn: dietSubmission,
    mutationKey: ["diet"],
    onSuccess: (data) => {
      queryClient.setQueryData(["diet"], data);
      toast.success(
        `Diet recommendation ${location.pathname === "getData" ? "added" : "updated"}  successfully!`
      );
      navigate(`${location.pathname === "getData" ? "/" : ""}`, {
        replace: true
      });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return { dietFn, isPending };
}

export default useDiet;
