import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const {info, authenticated} = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async() =>{
    try{
      const data = await axios.post('users/logout',{},
        {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials:true
        }
  )
      if(data.ApiError){
          toast.error(data.ApiError.message)
      }else{
          
          toast.success(' Logged out.')
          
          navigate('/login')
          dispatch(removeUser());
      }
  }catch(error){
      console.log(error);
  }
}
    return <>
    <div className="shadow-lg p-3 sm:flex sm:items-center sm:justify-between font-sans">
  <div className="flex justify-between">
<h1 className="text-gray-800 font-semibold text-lg sm:text-xl"><Link to = "/">INSIDEOUT</Link></h1>
  <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
  </div>
  <div className="hidden sm:block">
    <ul className="flex flex-col sm:flex-row sm:space-x-5 space-y-2 sm:space-y-0 font-medium text-gray-600 text-center items-center">
      <li className="hover:border-b-2 border-gray-200 cursor-pointer"><Link to = "/about">About</Link></li>
      <li className="hover:border-b-2 border-gray-200 cursor-pointer"><Link to = "/services">Services</Link></li>
      <li className="hover:border-b-2 border-gray-200 cursor-pointer"><Link to = "/contacts">Contact Us</Link></li>
      <li>
        {authenticated? <><button className="bg-gray-700 pr-2 pl-2 pt-1 pb-1 rounded-md text-gray-200 hover:bg-gray-800 transition" onClick={handleSignOut}>
          Sign Out
        </button></> : 
        <>
        <button className="bg-gray-700 pr-2 pl-2 pt-1 pb-1 rounded-md text-gray-200 hover:bg-gray-800 transition">
          <Link to = "/login">
          Sign In
          </Link>
          
        </button>
        </>
        }
      </li>
    </ul>
    
  </div>
  {isDropdownOpen && (
    <div className="block sm:hidden">
    <ul className="flex flex-col sm:flex-row sm:space-x-5 space-y-2 sm:space-y-0 font-medium text-gray-600 text-center items-center">
      <li className="hover:border-b-2 border-gray-200 cursor-pointer">About</li>
      <li className="hover:border-b-2 border-gray-200 cursor-pointer">Services</li>
      <li className="hover:border-b-2 border-gray-200 cursor-pointer">Contact Us</li>
      <li>
      {authenticated? <><button className="bg-gray-700 pr-2 pl-2 pt-1 pb-1 rounded-md text-gray-200 hover:bg-gray-800 transition" onClick={handleSignOut}>
          Sign Out
        </button></> : 
        <>
        <button className="bg-gray-700 pr-2 pl-2 pt-1 pb-1 rounded-md text-gray-200 hover:bg-gray-800 transition">
          <Link to = "/login">
          Sign In
          </Link>
          
        </button>
        </>
        }
      </li>
    </ul>
    
  </div>
  )}

</div>

    
    </>
}

export default Header;