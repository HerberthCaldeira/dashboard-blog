import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/Error";
import Login from "./pages/login/Login";
import Dashboard from "./pages/authenticated/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Category from "./pages/authenticated/category/Index";
import NewCatagory from "./pages/authenticated/category/new/NewCatagory";
import Posts from "./pages/authenticated/post/Index";
import NewPost from "./pages/authenticated/post/new/NewPost";

const Fallback = () => {
  const error = useRouteError();
  console.log(error);

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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
