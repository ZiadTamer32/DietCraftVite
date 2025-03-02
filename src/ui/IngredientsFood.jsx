/* eslint-disable react/prop-types */
function IngredientsFood({ serOverlay }) {
  return (
    <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-20">
      <div className="flex flex-col gap-3 p-5 text-white bg-teal-500">
        <h3>Hello Overlay</h3>
        <button
          type="button"
          onClick={() => serOverlay((e) => !e)}
          className="flex items-center justify-center gap-2 px-4 py-2 mx-auto text-white transition bg-teal-600 rounded-lg hover:bg-teal-800 w-fit"
        >
          X Close
        </button>
      </div>
    </div>
  );
}

export default IngredientsFood;
