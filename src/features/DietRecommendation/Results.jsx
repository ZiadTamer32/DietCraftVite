/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

function Results({ dessert }) {
  const { numWeek, numDay } = useParams();
  return (
    <li className="list-none bg-white border border-gray-200">
      <img
        className="object-cover w-full h-48"
        src={dessert?.Images[0] || "/6c4a7fb9-5fde-42e2-b537-b4732a92cf56.png"}
        alt={dessert?.Name || "Recipe photo"}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {dessert?.Name}
        </h5>

        <p className="mb-1 font-normal text-gray-700">
          Calories: {dessert?.Calories || "N/A"}
        </p>
        <p className="mb-1 font-normal text-gray-700">
          Fat Content: {dessert?.FatContent || "N/A"}
        </p>
        <p className="mb-4 font-normal text-gray-700">
          Sugar Content: {dessert?.SugarContent || "N/A"}
        </p>
        <Link
          to={`/diet-recommendation/week/${numWeek}/day/${numDay}/${dessert?.RecipeId || "#"}`}
          className="flex items-center transition justify-center px-5 py-3 text-sm font-medium text-center text-white bg-[#095c43] rounded-lg hover:bg-[#053728]  focus:outline-none"
        >
          More details
        </Link>
      </div>
    </li>
  );
}

export default Results;
