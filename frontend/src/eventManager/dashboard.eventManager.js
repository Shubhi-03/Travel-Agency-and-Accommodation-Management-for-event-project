import { useSelector } from "react-redux"
import useEventList from "../hooks/useEventsList.js";

const EventManagerDashboard = () =>{
   
    let {info} = useSelector((store) => store.user)
    info = info.data.data.user
    console.log(info)
    return<>
    <div className="flex bg-slate-200 items-center h-2/4">
       
        <div>
         {!info.profilePicture && <img width="250" height="250" src="https://img.icons8.com/fluency/48/test-account--v1.png" alt="test-account--v1"/>} 
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg w-9/12 ">
      <div className="grid grid-cols-2 gap-6">
        
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Name</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
            {info.name}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">E-mail</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
            {info.email}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Phone Number</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
            {info.phoneNumber}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Date of Joining</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
          {new Date(info.updatedAt).toISOString().split("T")[0]}
          </span>
        </div>

      </div>
    </div>

        </div> 
    
    
    </>
}

export default EventManagerDashboard