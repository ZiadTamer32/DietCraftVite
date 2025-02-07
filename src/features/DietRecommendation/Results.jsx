import { Link } from "react-router-dom";

function Results({ dessert }) {
  return (
    <li className="max-w-sm mt-4 ml-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-center">
        <img
          className="object-cover w-full rounded-t-lg h-52"
          src={dessert?.Images[0] || "fallback-image-url.jpg"}
          alt={dessert?.Name || "Recipe photo"}
        />
      </div>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {dessert?.Name}
          </h5>
        </a>
        <p className="mb-1 font-normal text-gray-700">
          Calories: {dessert?.Calories || "N/A"}
        </p>
        <p className="mb-1 font-normal text-gray-700">
          Fat Content: {dessert?.FatContent || "N/A"}
        </p>
        <p className="mb-1 font-normal text-gray-700">
          Sugar Content: {dessert?.SugarContent || "N/A"}
        </p>
        <Link
          to={`/diet-recommendation/${dessert?.RecipeId || "#"}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          More details
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </li>
  );
}

export default Results;
