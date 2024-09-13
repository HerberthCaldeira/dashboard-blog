import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/Error";
import Login from "./pages/login/Index";
import Dashboard from "./pages/authenticated/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Category from "./pages/authenticated/category/Index";
import NewCatagory from "./pages/authenticated/category/new/NewCatagory";
import Posts from "./pages/authenticated/post/Index";
import NewPost from "./pages/authenticated/post/new/NewPost";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import "./index.css";
import App from "./App";
import EditFormCategory from "./pages/authenticated/category/edit/EditFormCategory";

const Fallback = () => {
  const error = useRouteError();
  console.log("Fallback", error);

  return (
    <div>
      <p>React router Error Boundary</p>
    </div>
  );
};

//TODO: move routes to a another file
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
    errorElement: <Fallback />,
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
      {
        path: "category/:id/edit",
        element: <EditFormCategory />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/new",
        element: <NewPost />,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
    mutations: {
      onError: (err) => {
        console.log("global react query", err);
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />

      <App />
    </QueryClientProvider>
  </StrictMode>,
);
