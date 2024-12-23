import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { login, isPending } = useLogin();

  return (
    <section className="flex-1">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:min-h-screen lg:py-0">
        <div className=" bg-white rounded-lg shadow-lg border sm:max-w-md">
          <div className=" space-y-4 px-8 pt-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center">
              Login
            </h1>
            <form onSubmit={handleSubmit(login)} className="space-y-4 pb-8">
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[^@]+@[^@]+\.[^@]+$/
                  })}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                  placeholder="example@example.com"
                  autoComplete="email"
                />
              </div>

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
                  {...register("password", {
                    required: "Password is required"
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                  autoComplete="current-password"
                />
              </div>

              <button
                disabled={isPending}
                className="text-white bg-gray-700 hover:bg-gray-900 transition font-medium rounded-lg text-sm w-full px-5 py-2.5 flex justify-center items-center shadow-md"
              >
                {isPending ? <SpinnerMini /> : "Login"}
              </button>

              <div className="text-sm font-light text-gray-600 px-6 my-4 text-center">
                You don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign Up here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
