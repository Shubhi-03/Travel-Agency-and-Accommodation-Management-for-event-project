import { useSelector } from "react-redux"
import useEventList from "../hooks/useEventsList.js";

const EventManagerDashboard = () =>{
   
    let {info} = useSelector((store) => store.user)
    info = info.data.data.user
    console.log(info)
    return<>
    <div className="flex bg-slate-200 items-center  justify-between h-2/4">
       
        <div>
         {!info.profilePicture && <img width="250" height="250" src="https://img.icons8.com/fluency/48/test-account--v1.png" alt="test-account--v1"/>} 
        </div>
        
        <div className="flex-col bg-white m-10 w-2/3 h-2/3">
           <div className="m-5 text-lg rounded-sm shadow-md font-medium bg-slate-200 pl-2 pr-2 text-center">{info.name}</div>
        <ul className="flex justify-between text-center">
            <li className=" m-5 text-lg rounded-sm shadow-md font-medium bg-slate-200 pl-2 pr-2">{info.email}</li>
            <li className="m-5 text-lg rounded-sm shadow-md font-medium bg-slate-200 pl-2 pr-2">{info.phoneNumber}</li>
            <li></li>
        </ul> 
            </div>
        </div> 
    
    
    </>
}

export default EventManagerDashboard