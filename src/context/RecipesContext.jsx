/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
import useGetTarget from "../features/DietRecommendation/useGetTarget";
import useUser from "../features/auth/useUser";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const { user } = useUser(); // Assuming you have a custom hook to get the user
  const { getTarget } = useGetTarget(user?.email);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Log the cluster data for debugging

  const getData = () => {
    if (!getTarget?.[0]?.Cluster) return; // Check if cluster exists before making the API call

    setIsLoading(true);
    axios
      .get(
        `http://127.0.0.1:344/recommended_meals/?cluster=${getTarget?.[0]?.Cluster}`
      )
      .then((res) => {
        setData(Object.values(res?.data)[0]); // Extract the data you need
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (getTarget?.[0]?.Cluster) {
      getData(); // Call the function when cluster is available
    }
  }, [getTarget?.[0]?.Cluster]); // Re-run this effect when 'cluster' changes

  // Function to get a recipe by ID
  const getRecipeById = (id) => {
    return data?.find((recipe) => recipe?.RecipeId === Number(id) || null);
  };

  return (
    <RecipesContext.Provider value={{ data, getRecipeById, isLoading }}>
      {children}
    </RecipesContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error(
      "useRecipes must be used within a RecipesProvider. Wrap your component with RecipesProvider."
    );
  }
  return context;
}

export { RecipesProvider, useRecipes };
