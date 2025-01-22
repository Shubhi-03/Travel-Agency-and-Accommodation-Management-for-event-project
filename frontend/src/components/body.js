import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import About from "./about";
import Services from "./services";
import Contact from "./contact";


const Body = () =>{
        const appRouter = createBrowserRouter([
          {
            path:"/",
            element: <Home/>
          },
            {
            path: "/login",
            element: <Login/>
          },
          {
            path : "/about",
            element : <About/>
          },
          {
            path : "/services",
            element : <Services/>
          },
          {
            path : "/contacts",
            element : <Contact/>
          }
          
        ]);
return <>
<div>
    <RouterProvider router = {appRouter}/>
</div>
</>
}

export default Body;