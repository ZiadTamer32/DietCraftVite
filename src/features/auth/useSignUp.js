import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, firstName, lastName }) =>
      signUpApi({ email, password, firstName, lastName }),
    onSuccess: () => {
      toast.success("Account created successfully !");
      navigate("/login");
    },
    onError: () => {
      toast.error("Failed to create account. Please try again.");
    }
  });
  return { signup, isPending };
}

export default useSignUp;