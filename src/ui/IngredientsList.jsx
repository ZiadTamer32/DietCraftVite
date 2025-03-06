/* eslint-disable react/prop-types */
function IngredientsList({ item, setSelectedIngredient }) {
  const Name =
    item.description.split(" ").length > 3
      ? item.description.split(" ").slice(0, 3).join(" ") + "..."
      : item.description;
  return (
    <div className="p-2 sm:p-3">
      <button
        onClick={() => setSelectedIngredient(item)}
        className="h-[5em] w-full shadow-xl cursor-pointer bg-white rounded-[1em] overflow-hidden relative group p-2 z-0"
      >
        <div className="absolute h-[5em] w-[5em] group-hover:scale-[1700%] duration-500 -top-[2.5em] -right-[2.5em] rounded-full bg-green-600 z-[-1]"></div>
        <h1 className="flex items-center h-full px-2 text-xl font-bold duration-500 md:text-2xl group-hover:text-white">
          {Name?.charAt(0).toUpperCase() + Name?.slice(1)}
        </h1>
      </button>
    </div>
  );
}

export default IngredientsList;
