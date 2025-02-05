import { useContext, useEffect, useState, createContext } from "react";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      try {
        const res = await fetch("http://localhost:9000/0");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error.message);
      }
    }

    getRecipes();
  }, []);

  return (
    <RecipesContext.Provider value={{ setData, data }}>
      {children}
    </RecipesContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error(
      "useRecipes must be used within a RecipesProvider. Wrap your component with RecipesProvider."
    );
  }
  return context;
}

export { RecipesProvider, useRecipes };
