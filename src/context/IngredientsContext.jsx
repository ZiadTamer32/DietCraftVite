/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";

const IngredientsContext = createContext();

function IngredientsProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchIngredients() {
      if (!searchItem.trim()) {
        setData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://trackapi.nutritionix.com/v2/search/instant/?query=${searchItem}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-app-id": "dd5778c4",
              "x-app-key": "7cbbe7b7640b0437df5603f2ebc8597d"
            },
            signal
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching ingredients: ", error);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchIngredients();

    return () => {
      controller.abort(); // إلغاء الطلب السابق عند تحديث `searchItem`
    };
  }, [searchItem]);

  return (
    <IngredientsContext.Provider
      value={{ data, isLoading, searchItem, setSearchItem }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredients() {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error(
      "useIngredients must be used within a IngredientsProvider. Wrap your component with IngredientsProvider."
    );
  }
  return context;
}

export { IngredientsProvider, useIngredients };
