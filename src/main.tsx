import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/Error";
import Dashboard from "./pages/authenticated/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Category from "./pages/authenticated/category";
import Posts from "./pages/authenticated/post/Index";
import NewPost from "./pages/authenticated/post/form/NewPost";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import "./index.css";
import App from "./App";
import { default as EditCategory } from "./pages/authenticated/category/form/edit";
import { default as CreateCategory } from "./pages/authenticated/category/form/create";
import Login from "./pages/login";

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
        element: <CreateCategory />,
      },
      {
        path: "category/:id/edit",
        element: <EditCategory />,
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
  </StrictMode>
);
