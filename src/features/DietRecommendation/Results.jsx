/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

function Results({ dessert }) {
  const { numWeek, numDay } = useParams();

  return (
    <li className="flex flex-col overflow-hidden shadow-md rounded-2xl">
      <img
        className="object-cover w-full h-48 rounded-t-2xl"
        src={dessert?.Images[0] || "/6c4a7fb9-5fde-42e2-b537-b4732a92cf56.png"}
        alt={dessert?.Name || "Recipe photo"}
      />

      <div className="flex flex-col gap-4 p-5">
        <p className="text-xl font-semibold text-start">{dessert?.Name}</p>
        <div className="flex justify-between">
          <div className="flex flex-col gap-3 md:flex-row">
            <p className="font-normal text-gray-700">
              {dessert?.Calories || "N/A"} kcal
            </p>
            <p className="font-normal text-gray-700">
              {dessert?.ProteinContent || "N/A"}g protien
            </p>
          </div>
          <div>
            <Link
              to={`/diet-recommendation/week/${numWeek}/day/${numDay}/${dessert?.RecipeId || "#"}`}
              className=" block transition px-3 py-2 text-sm font-medium text-[#16a34a] hover:text-white border border-[#16a34a] rounded-lg hover:bg-[#16a34a] focus:outline-none"
            >
              More details
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Results;
