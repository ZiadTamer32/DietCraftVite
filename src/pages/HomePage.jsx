import { IoMdFitness } from "react-icons/io";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <main>
      <div className="flex flex-col image items-center justify-center h-screen text-[#313121]">
        <div className="text-center max-w-[37.5rem] max-md:p-3">
          <h1 className="sm:text-[2.25rem] text-2xl leading-relaxed sm:mb-5 max-lg:drop-shadow-xl max-md:drop-shadow-md max-sm:drop-shadow-sm">
            Welcome to DietCraft – Your journey to a healthier lifestyle starts
            here !
          </h1>
          <Link
            to="/diet-recommendation"
            className="flex items-center justify-center gap-2 px-3 py-2 mx-auto mt-4 font-semibold text-white rounded-lg sm:px-6 sm:py-4 sm:text-xl text-md btn-grad w-fit"
          >
            <IoMdFitness className="w-7 h-7" />
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
