import ProtectedLayout from "@/layouts/ProtectedLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
