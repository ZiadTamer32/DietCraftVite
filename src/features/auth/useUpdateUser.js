import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        toast.error("Invalid password format.");
      } else {
        toast.error(
          error.message || "An error occurred while updating the user."
        );
      }
    }
  });

  return { editUser, isPending };
}

export default useUpdateUser;
