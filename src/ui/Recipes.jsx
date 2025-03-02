import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import { CiSearch } from "react-icons/ci";
import Result from "../features/DietRecommendation/Results";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

function Recipes() {
  const { data = [], isLoading } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page from URL or default to 1
  const pageFromParams = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromParams);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data?.filter((recipe) =>
    recipe.Name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  const currentPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col max-w-[1050px] mx-auto gap-3">
      <h2 className="text-3xl font-bold text-center md:text-4xl md:text-start">
        Featured Recipes
      </h2>
      <p className="text-sm text-center text-gray-700 md:text-md md:text-start">
        Discover our collection of delicious, easy-to-follow recipes that will
        help you stay on track with your fitness goals.
      </p>
      <div className="relative w-full max-w-full mx-auto">
        <input
          placeholder="Search..."
          className="w-full px-5 py-3 border border-gray-300 shadow-sm outline-none rounded-xl transition-72"
          name="search"
          type="text"
          autoComplete="off"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <CiSearch
          size={20}
          className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 top-1/2 right-4"
        />
      </div>

      {currentPosts.length > 0 ? (
        <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((dessert) => (
            <Result key={dessert.RecipeId} dessert={dessert} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPosts={filteredData ? filteredData?.length : 0}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Recipes;
