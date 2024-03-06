import React from "react";
import {createRoot} from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import DriverInfo from "./pages/Driver_Info"
import Complaint from "./pages/Complaint"
import Report from "./pages/Report"
import Pass from "./pages/Change_Pass"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar";
import Archive from "./pages/Archive"
import DriverInfo2 from "./pages/Driver_Info2"
import Profile from "./pages/Profile"
import "./css/App.css"

const AuthGuard = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("token");
  
  if (!isAuthenticated) {
    navigate("/");
    return <Navigate to="/" />;
  }
  
  return <AppLayout />;
}

const AppLayout = () => {
  return(
    <>
      <Navbar />
      <Outlet />
    </>
  )
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "driver_info",
        element: <DriverInfo />
      },
      {
        path: "complaint",
        element: <Complaint />
      },
      {
        path: "report",
        element: <Report />
      },
      {
        path: "change_pass",
        element: <Pass />
      },
      {
        path: "archive",
        element: <Archive/>
      },
      {
        path: "driver_info2",
        element: <DriverInfo2/>
      },
      {
        path: "profile",
        element: <Profile/>
      },
      
    ]
  },
  {
    path: "*",
    element: <NotFound />
             
  },
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);