/* eslint-disable react/prop-types */
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function IngredientsList({ item }) {
  return (
    <div className="px-3">
      <div className="relative flex items-center justify-between bg-white rounded-lg shadow-2xl">
        <div></div>
        <div className="p-4 rounded-r-lg border-s border-gray-900/10 sm:border-l-transparent sm:p-6">
          <h3 className="text-xl font-bold text-gray-900">
            {item.food_name
              ? item.food_name.charAt(0).toUpperCase() + item.food_name.slice(1)
              : "Unknown Food"}
          </h3>
          <p className="mt-2 text-gray-700 line-clamp-3 text-sm/relaxed">
            This delicious meal is crafted with fresh ingredients, offering a
            perfect balance of flavors. A satisfying choice for any time of the
            day.
          </p>
        </div>
        <div className="px-5">
          <Link
            to="#" // Use `to` instead of `href` for React Router
            className="text-green-500 transition hover:text-green-700"
          >
            <IoMdArrowForward size={27} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IngredientsList;
