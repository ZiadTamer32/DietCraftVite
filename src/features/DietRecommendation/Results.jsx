import { Link, useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function Results({ dessert }) {
  const { numWeek, numDay } = useParams();
  return (
    <div className="relative flex flex-col mt-20 text-gray-700 bg-white shadow-md w-30 rounded-xl bg-clip-border">
      <div className="relative mx-4 -mt-6 overflow-hidden text-white shadow-lg h-60 rounded-xl bg-blue-gray-500 bg-clip-border bg-gradient-to-r from-white-500 to-white-600">
        <div className="flex items-center justify-center">
          <img
            className="object-cover w-full rounded-t-lg"
            src={
              dessert?.Images[0] ||
              "/public/6c4a7fb9-5fde-42e2-b537-b4732a92cf56.png"
            }
            alt={dessert?.Name || "Recipe photo"}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-full p-6">
        <div>
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {dessert?.Name}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            Calories: {dessert?.Calories || "N/A"}
          </p>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            Fat Content: {dessert?.FatContent || "N/A"}
          </p>
        </div>
        <div className="mt-auto">
          <Link
            to={`/diet-recommendation/week/${numWeek}/day/${numDay}/${dessert.RecipeId}`}
          >
            <button
              data-ripple-light="true"
              type="button"
              className="w-full sm:w-auto mt-4 select-none rounded-lg bg-[#095c43] hover:bg-[#053728] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-[#053728] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
