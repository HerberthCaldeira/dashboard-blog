import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/Error";
import Login from "./pages/login/Login";
import Dashboard from "./pages/authenticated/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Category from "./pages/authenticated/category/Category";
import NewCatagory from "./pages/authenticated/category/new/NewCatagory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "category",
        element: <Category />,
        children: [],
      },
      {
        path: "category/new",
        element: <NewCatagory />,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
