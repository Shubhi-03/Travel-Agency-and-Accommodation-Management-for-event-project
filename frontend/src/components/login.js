import Header from "./header";
import login from "../utils/login.jpeg"
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () =>{
    const [data, setData] = useState({
        email: "",
        password:""
      })
      const handleSubmit = () =>{

      }
    return<>
    <Header/>
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
        <Link to="/">
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