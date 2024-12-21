import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import DietRecommendation from "./pages/DietRecommendation";
import CustomRecommendation from "./pages/CustomRecommendation";
import BrowseFoods from "./pages/BrowseFoods";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const reactQuery = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  });
  return (
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
            fontSize: "18px",
            maxWidth: "500px",
            padding: "18px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)"
          }
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
