import { useForm } from "react-hook-form";
import useUser from "../auth/useUser";
import usePlan from "./usePlan";
import Target from "../DietRecommendation/Target";

function DietForm() {
  const {
    register,
    formState: { errors },
    watch
  } = useForm();

  const { user } = useUser();
  const { plan: plans } = usePlan(user?.email);
  // Initialize `myAge` and `age` state
  const details = Array.isArray(plans) ? plans.map((e) => e) : [];

  // Initialize form values
  const initialAge = details.length > 0 ? details[0]?.age : null;
  const initialWeight = details.length > 0 ? details[0]?.weight : null;
  const initialHeight = details.length > 0 ? details[0]?.height : null;
  const initialBodyfat = details.length > 0 ? details[0]?.bodyFat : null;
  const initialPlan = details.length > 0 ? details[0]?.plan : null;
  const initialGender = details.length > 0 ? details[0]?.gender : null;
  const initialActivity = details.length > 0 ? details[0]?.activity : null;

  const yourAge = Number(watch("age")) || initialAge;
  const yourWeight = Number(watch("weight")) || initialWeight;
  const yourHeight = Number(watch("height")) || initialWeight;
  const yourBodyFat = Number(watch("bodyFat")) || initialBodyfat;
  const yourGender = watch("gender") || initialGender;
  const yourActivity = watch("activity") || initialActivity;
  const yourPlan = watch("plan") || initialPlan;

  return (
    <div>
      <div>
        <form>
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
                defaultValue={initialAge}
                {...register("age", {
                  required: "Age is required",
                  min: { value: 13, message: "Age must exceed 100 cm" },
                  max: { value: 110, message: "Age must not exceed 250 cm" }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Other form fields (height, weight, etc.) */}
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
                defaultValue={initialHeight}
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
                defaultValue={initialWeight}
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
                defaultValue={initialBodyfat}
                type="number"
                id="bodyFat"
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

          {/* Gender and Activity fields */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                defaultValue={initialGender}
                {...register("gender")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="activity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Activity
              </label>
              <select
                defaultValue={initialActivity}
                id="activity"
                {...register("activity")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="little">Little/no exercise</option>
                <option value="light">Light exercise</option>
                <option value="moderate">Moderate exercise</option>
                <option value="veryActive">Very Active</option>
                <option value="extrActive">
                  Extra active (very active & physical job)
                </option>
              </select>
            </div>
          </div>

          {/* Plan selection */}
          <label
            htmlFor="plan"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Choose your weight loss plan:
          </label>
          <select
            id="plan"
            defaultValue={initialPlan}
            {...register("plan")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="maintain">Maintain Weight</option>
            <option value="mild">Mild Weight Loss</option>
            <option value="loss">Weight Loss</option>
            <option value="extreme">Extreme Weight Loss</option>
          </select>
        </form>
      </div>
      <Target
        yourAge={yourAge}
        yourWeight={yourWeight}
        yourHeight={yourHeight}
        yourBodyFat={yourBodyFat}
        yourGender={yourGender}
        yourActivity={yourActivity}
        yourPlan={yourPlan}
      />
    </div>
  );
}

export default DietForm;
