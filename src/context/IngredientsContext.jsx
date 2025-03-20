/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";

const IngredientsContext = createContext();

function IngredientsProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [prevSearch, setPrevSearch] = useState("");

  useEffect(() => {
    if (searchItem === prevSearch) return;
    setPrevSearch(searchItem);

    if (!searchItem.trim() || searchItem.trim().length < 3) {
      setData(null); // تنظيف البيانات فقط عند بحث غير صالح
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    setIsLoading(true); // جعل السبينر يظهر فور بدء البحث

    async function fetchIngredients() {
      try {
        const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=7OzdgD1h7fyklruZGsBB77TgSAEIb9KugGQizT4e&query=${searchItem}&dataType=Foundation,Branded`,
          { signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const newData = await res.json();

        // فقط إذا كانت هناك نتائج نحدّث البيانات
        if (newData.foods && newData.foods.length > 0) {
          setData(newData);
        } else {
          setData(null); // عدم التحديث إلا عند عدم وجود نتائج فعلية
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching ingredients: ", error);
          setData(null);
        }
      } finally {
        setIsLoading(false); // إيقاف السبينر بعد انتهاء العملية
      }
    }

    fetchIngredients();
    return () => controller.abort();
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
  return useContext(IngredientsContext);
}

export { IngredientsProvider, useIngredients };
