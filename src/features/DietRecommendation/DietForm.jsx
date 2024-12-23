import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../auth/useUser";
import Results from "./Results";
import SpinnerMini from "../../ui/SpinnerMini";
import useDiet from "./useDiet";

function DietForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (result) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [result]);

  const Sucess = () => {
    setResult(true);
  };

  const { dietFn, isPending } = useDiet();
  const { user } = useUser();
  const email = user?.user_metadata?.email;

  function Submit(addGuest) {
    console.log("Submitted data:", addGuest);
    dietFn({ addGuest, email });
  }

  return (
    <div className="py-5">
      <div className="text-center text-gray-900 px-5">
        <h1 className="font-bold lg:text-4xl text-xl mb-2">
          Automatic Diet Recommendation
        </h1>
        <h3 className="font-semibold sm:text-lg text-md sm:mb-5 mb-2">
          Get personalized diet recommendations based on your goals and
          lifestyle
        </h3>
      </div>
      <div className="block max-lg:box-shadow max-w-[850px] mx-auto sm:border sm:border-slate-200">
        <form onSubmit={handleSubmit(Submit)} className="p-7">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                {...register("age", { required: "Age is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>
            <input
              type="hidden"
              value={email || ""}
              {...register("email")}
              id="email"
              name="email"
            />
            <div>
              <label
                htmlFor="height"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                {...register("height", {
                  required: "Height is required",
                  max: { value: 250, message: "Height must not exceed 250 cm" }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.height && (
                <p className="text-red-500 text-sm">{errors.height.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                {...register("weight", { required: "Weight is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="bodyFat"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Body Fat Percentage (%)
              </label>
              <input
                type="number"
                id="bodyFat"
                {...register("bodyFat", {
                  required: "Body Fat is required",
                  max: { value: 100, message: "Body Fat must not exceed 100%" }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.bodyFat && (
                <p className="text-red-500 text-sm">{errors.bodyFat.message}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="activity"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Activity
            </label>
            <select
              id="activity"
              {...register("activity")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="little">Little/no exercise</option>
              <option value="light">Light exercise</option>
              <option value="moderate">Moderate exercise</option>
              <option value="very_active">Very Active</option>
              <option value="extra_active">
                Extra active (very active & physical job)
              </option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="plan"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Choose your weight loss plan:
            </label>
            <select
              id="plan"
              {...register("plan")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="maintain">Maintain Weight</option>
              <option value="mild">Mild Weight Loss</option>
              <option value="loss">Weight Loss</option>
              <option value="extreme">Extreme Weight Loss</option>
            </select>
          </div>
          {/* <RangeForm register={register} /> */}
          <div className="mb-6">
            <label
              htmlFor="meals_per_day"
              className="block text-gray-900 mb-2 text-sm font-medium"
            >
              Meals per day
            </label>
            <select
              id="meals_per_day"
              {...register("numMeals")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="duration"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Diet Duration
            </label>
            <input
              type="date"
              id="duration"
              {...register("dietDuration", {
                required: "Diet duration is required"
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>
          <button
            disabled={isPending}
            onClick={() => Sucess()}
            className="bg-[#095c43] hover:bg-[#053728] transition focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white"
          >
            {isPending ? <SpinnerMini /> : "Generate"}
          </button>
        </form>
      </div>
      {result && <Results />}
    </div>
  );
}

export default DietForm;
