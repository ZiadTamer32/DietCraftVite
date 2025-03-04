/* eslint-disable react/prop-types */
// import { IoMdArrowForward } from "react-icons/io";
// import { Link } from "react-router-dom";

function IngredientsList({ item }) {
  return (
    <div className="p-2 sm:p-3">
      <div className="h-[5em] w-full shadow-xl cursor-pointer bg-white rounded-[1em] overflow-hidden relative group p-2 z-0">
        <div className="absolute h-[5em] w-[5em] group-hover:scale-[1700%] duration-500 -top-[2.5em] -right-[2.5em] rounded-full bg-green-600 z-[-1]"></div>
        <h1 className="flex items-center h-full px-2 text-xl font-bold duration-500 md:text-2xl group-hover:text-white">
          {item.food_name.charAt(0).toUpperCase() + item.food_name.slice(1)}
        </h1>
      </div>
    </div>
  );
}

export default IngredientsList;

//  group-hover:scale-[1700%] duration-500  || duration-500 group-hover:text-white
