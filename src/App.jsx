import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { RecipesProvider } from "./context/RecipesContext";

import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import DietRecommendation from "./pages/DietRecommendation";
import CustomRecommendation from "./pages/CustomRecommendation";
import BrowseFoods from "./pages/BrowseFoods";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import SignUp from "./pages/SignUp";
import RecipeDays from "./pages/MealsPage";

function App() {
  const reactQuery = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  });

  return (
    <RecipesProvider>
      <QueryClientProvider client={reactQuery}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<HomePage />} />
              <Route
                path="/diet-recommendation"
                element={<DietRecommendation />}
              />
              <Route
                path="/diet-recommendation/week/:numWeek/day/:numDay/:id"
                element={<Recipe />}
              />
              <Route
                path="/diet-recommendation/week/:numWeek/day/:numDay"
                element={<RecipeDays />}
              />
              <Route path="/custom-diet" element={<CustomRecommendation />} />
              <Route path="/browse-foods" element={<BrowseFoods />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "15px",
              textAlign: "center",
              maxWidth: "500px",
              padding: "18px 24px",
              backgroundColor: "#ffffff",
              color: "#000000)"
            }
          }}
        />
      </QueryClientProvider>
    </RecipesProvider>
  );
}

export default App;
