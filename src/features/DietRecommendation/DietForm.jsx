import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../auth/useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import useDiet from "./useDiet";
import Box from "../../ui/Box";

function DietForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [result, setResult] = useState(false);
  const [duration, setDuration] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (result) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [result]);

  const { dietFn, isPending } = useDiet();
  const { user } = useUser();
  const email = user?.user_metadata?.email;
  const firstName = user?.user_metadata?.firstName;
  const lastName = user?.user_metadata?.lastName;

  function onSubmit(data) {
    const addGuest = {
      ...data,
      fullName: `${firstName} ${lastName}`,
      email: email
    };
    dietFn(
      { addGuest, email },
      {
        onSuccess: () => {
          reset(), setResult(true);
        }
      }
    );
  }

  return (
    <div className="max-w-[900px] mx-auto p-5">
      <div className="text-center text-gray-900">
        <h1 className="mb-2 text-xl font-bold lg:text-4xl">
          Automatic Diet Recommendation
        </h1>
        <h3 className="mb-2 font-semibold sm:text-lg text-md">
          Get personalized diet recommendations based on your goals and
          lifestyle
        </h3>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-200 shadow-lg p-7 mb-7"
        >
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
                {...register("age", {
                  required: "Age is required",
                  min: {
                    value: 14,
                    message: "The minimum allowed age is 14 years"
                  },
                  max: {
                    value: 110,
                    message: "The maximum allowed age is 110 years"
                  }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>
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
                  min: { value: 100, message: "Height must exceed 100 cm" },
                  max: { value: 250, message: "Height must not exceed 250 cm" }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.height && (
                <p className="text-sm text-red-500">{errors.height.message}</p>
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
                {...register("weight", {
                  required: "Weight is required",
                  min: {
                    value: 60,
                    message: "The minimum allowed weight is 60"
                  },
                  max: {
                    value: 300,
                    message: "The maximum allowed weight is 300"
                  }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.weight && (
                <p className="text-sm text-red-500">{errors.weight.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="bodyFat"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Body Fat Percentage (%) (Optional)
              </label>
              <input
                type="number"
                id="bodyFat"
                defaultValue={0}
                {...register("bodyFat", {
                  max: { value: 100, message: "Body Fat must not exceed 100%" },
                  min: { value: 0, message: "Body Fat must be at least 0%" }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors.bodyFat && (
                <p className="text-sm text-red-500">{errors.bodyFat.message}</p>
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
          <div className="mb-6">
            <label
              htmlFor="meals_per_day"
              className="block mb-2 text-sm font-medium text-gray-900"
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
              htmlFor="Duration"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              How long do you want to diet per week?
            </label>
            <select
              id="Duration"
              {...register("Duration")}
              value={duration ?? 1}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="1">One Week</option>
              <option value="2">Two Weeks</option>
              <option value="3">Three Weeks</option>
              <option value="4">Four Weeks</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="startedAt"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Started At
            </label>
            <input
              type="date"
              id="startedAt"
              {...register("startedAt", { required: "Start Time is required" })}
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.startedAt && (
              <p className="text-sm text-red-500">{errors.startedAt.message}</p>
            )}
          </div>
          <button
            disabled={isPending}
            className="flex items-center justify-center bg-[#095c43] hover:bg-[#053728] transition focus:ring-4 focus:outline-none font-medium rounded-lg text-sm max-md:w-full  px-5 py-2.5 text-white mx-auto"
          >
            {isPending ? <SpinnerMini /> : "Generate"}
          </button>
        </form>
      </div>
      <div
        className={`grid max-sm:grid-cols-1 gap-6 mx-auto place-items-center ${duration == 1 ? "md:grid-cols-1" : duration >= 2 ? "md:grid-cols-2" : "md:grid-cols-1"}`}
      >
        {result && <Box number={duration || 1} />}
      </div>
    </div>
  );
}

export default DietForm;
