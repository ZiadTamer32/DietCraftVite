import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const { signup, isPending } = useSignUp();
  return (
    <section className="flex-1">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg border sm:max-w-md xl:p-0">
          <div className="px-6 pt-6 space-y-4 md:space-y-6 sm:px-8 sm:pt-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center">
              Create an Account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(signup)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name Input */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    {errors.firstName ? (
                      <p className="text-red-500">{errors.firstName.message}</p>
                    ) : (
                      "First Name"
                    )}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                    placeholder="Your First Name"
                    {...register("firstName", {
                      required: "First Name is required"
                    })}
                  />
                </div>
                {/* Last Name Input */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    {errors.lastName ? (
                      <p className="text-red-500">{errors.lastName.message}</p>
                    ) : (
                      "Last Name"
                    )}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                    placeholder="Your Last Name"
                    {...register("lastName", {
                      required: "Last Name is required"
                    })}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  {errors.email ? (
                    <p className="text-red-500">{errors.email.message}</p>
                  ) : (
                    "Email"
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                  placeholder="example@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  {errors.password ? (
                    <p className="text-red-500">{errors.password.message}</p>
                  ) : (
                    "Password"
                  )}
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    },
                    maxLength: {
                      value: 12,
                      message: "Password cannot be longer than 12 characters"
                    }
                  })}
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  {errors.confirmPassword ? (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  ) : (
                    "Confirm Password"
                  )}
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match"
                  })}
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isPending}
                className="text-white bg-gray-700 hover:bg-gray-900 transition font-medium rounded-lg text-sm w-full px-5 py-2.5 flex justify-center items-center shadow-md"
              >
                {isPending ? <SpinnerMini /> : "Create an account"}
              </button>
            </form>
          </div>
          <div className="text-sm font-light text-gray-600 px-6 my-4 text-center">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
