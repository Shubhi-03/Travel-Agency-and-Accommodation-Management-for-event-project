

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
import ClientEvents from "../client/events.client.js";
import TravelAgencyClient from "../client/travelAgency.js";
import AccommodationClient from "../client/accommodation.client.js";
import Booking from "../client/booking.client.js";
import AdminSideBar from "../admin/sideBar.admin.js";
import EventManagerManagement from "../admin/eventManagerManagement.js";
import EventManagement from "../admin/eventManagement.js";
import AccommodationsManagement from "../admin/accommodationManage.js";
import TravelAgencyManagement from "../admin/travelAgencyManage.js";
import BudgetManagement from "../admin/budgetManage.js";
import GuestForm from "./guestForm.js";
import ClientSideBar from "../client/sideBar.client.js";
import TravelAgencyApproval from "./travelAgencyApproval.js";
import AccommodationApproval from "./accommodationApproval.js";

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
  if (!allowedRoles.includes(info?.data?.data?.user.role)) {
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
          path: "/guestForm",
          element : <GuestForm/>
        },
        {
          path: "/travelAgencyapproval",
          element : <TravelAgencyApproval/>
        },
        {
          path: "/accommodationapproval",
          element : <AccommodationApproval/>
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
            {path : "events", element : <Events/>},
            {path : "budget", element : <Budget/>}
          ]
        },
        {
          path: "/client",
          element: (
            <PrivateRoute allowedRoles={["Client"]}>
      <div className="flex min-h-screen">
        <ClientSideBar /> 
        <div className="flex-1 p-4">
        <Outlet />
        </div>
      </div>
    </PrivateRoute>
          ),
          children : [
            {path : "", element : <ClientDashboard/>},
            {path : "events", element : <ClientEvents/>},
            {path : "travelAgency", element : <TravelAgencyClient/>},
            {path : "accommodation", element : <AccommodationClient/>},
            {path : "booking", element : <Booking/>},
            {path : "budget", element : <Budget/>}
          ]
        },
        {
          path: "/admin",
          element: (
            <PrivateRoute allowedRoles={["Admin"]}>
      <div className="flex min-h-screen">
        <AdminSideBar /> 
        <div className="flex-1 p-4">
        <Outlet />
        </div>
      </div>
    </PrivateRoute>
          ),
          children : [
            {path : "", element : <AdminDashboard/>},
            {path : "eventManagerManagement", element : <EventManagerManagement/>},
            {path : "eventManagement", element : <EventManagement/>},
            {path : "accommodationsManagement", element : <AccommodationsManagement/>},
            {path : "travelAgencyManagement", element : <TravelAgencyManagement/>},
            {path : "budget", element : <BudgetManagement/>}
          ]
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
