import Header from "./header";
import login from "../utils/login.jpeg"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const Login = () =>{
    const [data, setData] = useState({
        email: "",
        password:""
      })
      const dispatch = useDispatch();
          const navigate = useNavigate();
          const user = useSelector((store) => store.user)
          const handleSubmit = async(e) =>{
            e.preventDefault();
            const { email, password } = data
           
            try{
              const response = await axios.post('users/login',{
                  email, password
              },
              {
                  withCredentials:true
              }
          )
              console.log(response);
              if (response.data.ApiError) {
                  toast.error(response.data.Error.message || 'Something went wrong while registering.');
              }else{
                  setData({})
                  dispatch(addUser(response));
                  toast.success(' Welcome!')
                  const role = response.data.data.user.role;

                  if (role === "Admin") {
                    navigate("/admin");
                  } else if (role === "EventManager") {
                    navigate("/eventmanager");
                  } else if (role === "Client") {
                    navigate("/client");
                  } 
                  
              }
          }catch(error){
             
                  toast.error(error.message)
              console.log(error);
          }
          }
    return<>
    <div className="relative">
  <img className="w-screen h-screen object-cover" src={login} alt="Login" />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="space-y-3 w-1/3 bg-slate-300 p-6 rounded-lg shadow-lg opca">
      <form className="flex flex-col space-y-6">
        <h1 className="text-4xl font-bold py-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="p-2 bg-gray-100 rounded border border-gray-300 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="p-2 bg-gray-100 rounded border border-gray-300 w-full"
        />
        <button
          className="text-xl text-white font-bold p-2 bg-gray-800 rounded-md hover:bg-gray-600"
          onClick={handleSubmit}
        >
          Login
        </button>
        <Link to = "/register">
          <p className="cursor-pointer text-gray-700 hover:underline">
            New? Register Now
          </p>
        </Link>
      </form>
    </div>
  </div>
</div>

    {/* <div className="flex">
        <div className=" w-1/2  flex items-center justify-center">
        
        </div>
        <div className="w-1/2 h-screen bg-slate-300">
        <div className="flex flex-col space-y-3 absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2">
        <form className=" p-3 flex flex-col space-y-6 ">
            <h1 className="text-4xl font-bold py-4">Login</h1>
            
            <input
            type = "email"
            placeholder="Email"
            value = {data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            className="p-2 my-4 w-1/2 bg-gray-100"

            />
            <input
            type = "password"
            placeholder="Password"
            value = {data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
            className="p-2 my-4 w-1/2 bg-gray-100"

            />
        
        <button  className = "text-xl text-white font-bold p-2 my-4 w-1/2 bg-gray-800 rounded-md hover:bg-gray-600" onClick={handleSubmit}>Login</button>
        <Link to = "/"><p className="cursor-pointer" >
          
            New? Register Now
            
        </p></Link>
        </form>
    </div>
        </div>
    </div> */}
    </>
}

export default Login;