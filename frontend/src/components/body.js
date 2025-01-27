

import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Services from "./services";
import Contact from "./contact";
import Header from "./header"; // Assuming you have a separate Header component
import Home from "./home";
import { useSelector } from "react-redux";
import AdminDashboard from "../admin/dashboard.admin";
import ClientDashboard from "../client/dashboard.client";
import EventManagerDashboard from "../eventManager/dashboard.eventManager";
import Unauthorized from "./unauthorized";
import CreateAnEvent from "../eventManager/createAnEvent.eventManager";
import TravelAgency from "../eventManager/travelAgency.eventManager";
import Accommodations from "../eventManager/accommodations.eventManager";
import Events from "../eventManager/events.eventManager";
import Budget from "../eventManager/budget.eventManager";
import SideBar from "../eventManager/sideBar.eventManager";

const Layout = () => {
  return (
    <>
      <Header />

      <div className="">
        <Outlet />
      </div>
    </>
  );
};
const PrivateRoute = ({ children, allowedRoles }) => {
  const { authenticated, info } = useSelector((store) => store.user);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  console.log(allowedRoles)
  if (!allowedRoles.includes(info.data.data.user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Wrap all routes with the Layout component
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path : "/register",
          element: <Register/>
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/contacts",
          element: <Contact />,
        },
        {
          path: "/unauthorized",
          element : <Unauthorized />,
        },
        {
          path: "/eventManager",
          element: (
            <PrivateRoute allowedRoles={["EventManager"]}>
      {/* Layout container for Sidebar and Outlet */}
      <div className="flex min-h-screen">
        <SideBar /> {/* Sidebar on the left */}
        <div className="flex-1 p-4">
          {/* Main content (child routes) */}
          <Outlet />
        </div>
      </div>
    </PrivateRoute>
          ),
          children : [
            {path : "", element : <EventManagerDashboard/>},
            {path : "createAnEvent", element : <CreateAnEvent/>},
            {path : "travelAgency", element : <TravelAgency/>},
            {path : "accommodation", element : <Accommodations/>},
            {path : "events", element : <Events/>},
            {path : "budget", element : <Budget/>}
          ]
        },
        {
          path: "/client",
          element: (
            <PrivateRoute allowedRoles={["Client"]}>
              <ClientDashboard/>
            </PrivateRoute>
          )
        },
        {
          path: "/admin",
          element: (
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminDashboard/>
            </PrivateRoute>
          )
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
