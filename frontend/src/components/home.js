import { useState } from "react";
import Header from "./header";
import login from "../utils/login.jpeg"
import { Link } from "react-router-dom";

const Home = () =>{
    const [data, setData] = useState({
            email: "",
            password:"",
            name : "",
            phonenumber : "",
            role : ""
          })
          const handleSubmit = () =>{
    
          }
    return <>
    <Header/>
    <div className="relative">
  <img className="w-screen h-screen object-cover" src={login} alt="Login" />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="space-y-3 w-1/3 bg-slate-300 p-6 rounded-lg shadow-lg">
      <form className="flex flex-col space-y-6">
        <h1 className="text-4xl font-bold py-4 text-center">Register</h1>
        <input
          type="name"
          placeholder="Name"
          value={data.password}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="p-2 bg-gray-100 rounded border border-gray-300 w-full"
        />
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
        <select
      value={data.role}
      onChange={(e) => setData({ ...data, role: e.target.value })}
      className="p-2 bg-gray-100 rounded-md"
    >
      <option value="" disabled>
        Select Role
      </option>
      <option value="Admin">Admin</option>
      <option value="EventManager">Event manager</option>
      <option value="Client">Client</option>
    </select>
        <input
          type="phonenumber"
          placeholder="PhoneNumber"
          value={data.phonenumber}
          onChange={(e) => setData({ ...data, phonenumber: e.target.value })}
          className="p-2 bg-gray-100 rounded border border-gray-300 w-full"
        />
        <button
          className="text-xl text-white font-bold p-2 bg-gray-800 rounded-md hover:bg-gray-600"
          onClick={handleSubmit}
        >
          Register
        </button>
        <Link to="/login">
          <p className="cursor-pointer text-gray-700 hover:underline">
            Already registered? Login
          </p>
        </Link>
      </form>
    </div>
  </div>
</div>

    </>
}

export default Home;