/* eslint-disable react/prop-types */
import { useContext, useState, createContext } from "react";
import axios from "axios";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getNutritions(targetDataPayload) {
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:344/diet_recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(targetDataPayload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch nutritions");
      }

      const nutritions = await res.json();
      console.log("Nutritions:", nutritions);

      return nutritions;
    } catch (err) {
      console.error(err.message);

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function getData(cluster) {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:344/recommended_meals/?cluster=${cluster}`
      );
      setData(Object.values(res?.data)[0]);
      console.log("Fetching data for cluster:", cluster);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // 👇 This is the public function you call after user submits the form
  async function handleSubmitForm(formData) {
    const nutritions = await getNutritions(formData);

    if (nutritions?.Cluster) {
      await getData(nutritions.Cluster);
    }
  }

  // Function to get a recipe by ID
  const getRecipeById = (id) => {
    return data?.find((recipe) => recipe?.RecipeId === Number(id)) || null;
  };

  return (
    <RecipesContext.Provider
      value={{ data, getRecipeById, handleSubmitForm, isLoading }}
    >
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
