

import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./login.js";
import Register from "./register.js";
import About from "./about.js";
import Services from "./services.js";
import Contact from "./contact.js";
import Header from "./header.js"; // Assuming you have a separate Header component
import { useSelector } from "react-redux";
import AdminDashboard from "../admin/dashboard.admin.js";
import ClientDashboard from "../client/dashboard.client.js";
import EventManagerDashboard from "../eventManager/dashboard.eventManager.js";
import Unauthorized from "./unauthorized.js";
import CreateAnEvent from "../eventManager/createAnEvent.eventManager.js";
import TravelAgency from "../eventManager/travelAgency.eventManager.js";
import Accommodations from "../eventManager/accommodations.eventManager.js";
import Events from "../eventManager/events.eventManager.js";
import Budget from "../eventManager/budget.eventManager.js";
import SideBar from "../eventManager/sideBar.eventManager.js";

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
      path: "",
      element: <Layout />, // Wrap all routes with the Layout component
      children: [
        
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
      <div className="flex min-h-screen">
        <SideBar /> 
        <div className="flex-1 p-4">
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
