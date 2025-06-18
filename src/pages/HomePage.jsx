/* eslint-disable react/prop-types */
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { HiClipboardList, HiTrendingUp, HiClock } from "react-icons/hi";
import NavBar from "../ui/NavBar";
import useUser from "../features/auth/useUser";

const HeroSection = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 mt-16 bg-gradient-to-b from-green-50 to-white md:py-24 lg:py-52">
      <h1 className="mb-6 text-3xl font-bold text-center md:text-5xl lg:text-6xl">
        Welcome to <span className="text-[#16a34a]">DietCraft</span>
      </h1>

      <p className="max-w-2xl mb-10 text-xl text-center text-gray-500 md:text-2xl">
        Your smart companion for personalized diet planning.
      </p>

      <button
        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
        className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-[#16a34a] rounded-lg shadow-sm hover:bg-green-700"
      >
        Try it now
        <FaArrowRight className="w-5 h-5 mt-1" />
      </button>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 transition-all duration-300 bg-white shadow-md rounded-xl">
      <div className="flex items-center justify-center w-16 h-16 p-4 mb-4 rounded-full bg-white border border-[#16a34a]">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <div id="features" className="py-16 bg-gray-50 md:py-24">
      <div className="container px-6 mx-auto">
        <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">
          Why Choose DietCraft?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<HiClipboardList className="w-8 h-8 text-[#16a34a]" />}
            title="Personalized Plans"
            description="Get diet plans customized to your unique body metrics, goals, and preferences."
          />
          <FeatureCard
            icon={<HiTrendingUp className="w-8 h-8 text-[#16a34a]" />}
            title="Progress Tracking"
            description="Monitor your journey with easy-to-understand metrics and visualizations."
          />
          <FeatureCard
            icon={<HiClock className="w-8 h-8 text-[#16a34a]" />}
            title="Time-Saving"
            description="Save hours of research with AI-powered meal suggestions and shopping lists."
          />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-[#16a34a]">DietCraft</h3>
            <p className="mt-2 text-gray-500">
              Your smart companion for personalized diet planning.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-500">
              Terms
            </Link>
            <Link to="/contact" className="text-gray-500">
              Contact
            </Link>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center text-gray-500 border-t">
          <p>
            &copy; {new Date().getFullYear()} DietCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Homepage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </>
  );
};

export default Homepage;
