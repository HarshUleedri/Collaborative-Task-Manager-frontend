import ProfileInfo from "@/components/common/ProfileInfo";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ComingSoon from "@/pages/ComingSoon/ComingSoon";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import CreateTaskForm from "@/pages/Dashboard/components/CreateTaskForm";
import MembersList from "@/pages/Dashboard/components/MembersList";
import TaskOverview from "@/pages/Dashboard/components/TaskOverview";
import UpdateTaskForm from "@/pages/Dashboard/components/UpdateTaskForm";
import ManagerDashboard from "@/pages/Dashboard/ManagerDashboard/ManagerDashboard";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Signup from "@/pages/Signup/Signup";
import { createBrowserRouter, RouterProvider } from "react-router";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: <ProfileInfo />,
        },
        {
          path: "my-tasks",
          element: <Home />,
        },
        {
          path: "projects",
          element: <ComingSoon />,
        },
        {
          path: "analytics",
          element: <ComingSoon />,
        },
      ],
    },
    {
      path: "/manager",
      element: <ManagerDashboard />,
      children: [
        {
          index: true,
          element: <TaskOverview />,
        },
        {
          path: "create",
          element: <CreateTaskForm />,
        },
        {
          path: "task/:id",
          element: <UpdateTaskForm />,
        },
        {
          path: "profile",
          element: <ProfileInfo />,
        },
        {
          path: "projects",
          element: <ComingSoon />,
        },
        {
          path: "analytics",
          element: <ComingSoon />,
        },
        {
          path: "tasks-overview",
          element: <TaskOverview />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "create",
          element: <CreateTaskForm />,
        },
        {
          path: "task/:id",
          element: <UpdateTaskForm />,
        },
        {
          path: "profile",
          element: <ProfileInfo />,
        },
        {
          path: "members",
          element: <MembersList />,
        },
        {
          path: "projects",
          element: <ComingSoon />,
        },
        {
          path: "analytics",
          element: <ComingSoon />,
        },
        {
          path: "tasks-overview",
          element: <TaskOverview />,
        },
      ],
    },
    //not found route
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
