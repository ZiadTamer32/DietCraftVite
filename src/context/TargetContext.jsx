/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";

const targetContext = createContext();

function TargetProvider({ children }) {
  const [data, setData] = useState(null);
  const getData = () => {
    axios
      .get("../data/response.json")
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <targetContext.Provider value={{ data }}>{children}</targetContext.Provider>
  );
}

function useTarget() {
  const context = useContext(targetContext);
  if (!context) {
    throw new Error(
      "useTarget must be used within a RecipesProvider. Wrap your component with RecipesProvider."
    );
  }
  return context;
}

export { TargetProvider, useTarget };
