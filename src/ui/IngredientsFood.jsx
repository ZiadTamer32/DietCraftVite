/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useIngredients } from "../context/IngredientsContext";
import IngredientsList from "./IngredientsList";
import Spinner from "../ui/Spinner";

function IngredientsFood({ serOverlay }) {
  const { data, isLoading, setSearchItem, searchItem } = useIngredients();
  return (
    <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="w-[45rem] px-3 md:px-0">
        <div className="flex flex-col w-full gap-3 p-3 text-black bg-white rounded-lg shadow-lg sm:p-5">
          <div className="flex items-center justify-between w-full text-right">
            <h1 className="text-2xl font-bold">Ingredients</h1>
            <button
              type="button"
              onClick={() => serOverlay((e) => !e)}
              className="text-black hover:text-[#FB0101] transition"
            >
              <IoIosClose size={40} />
            </button>
          </div>

          <div className="relative w-full">
            <input
              placeholder="Search..."
              className="w-full px-5 py-3 border border-gray-300 shadow-sm outline-none rounded-xl transition-72"
              name="search"
              type="text"
              autoComplete="off"
              value={searchItem || ""}
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
            <CiSearch
              size={20}
              className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 top-1/2 right-4"
            />
          </div>

          {/* Scrollable container */}
          <div className="max-h-[400px] overflow-y-auto flex flex-col">
            {/* Ingredients List */}
            {isLoading ? (
              <Spinner />
            ) : !data ? (
              <p className="text-center text-gray-700">No result found</p>
            ) : (
              data?.common?.map((item, index) => (
                <IngredientsList key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientsFood;
