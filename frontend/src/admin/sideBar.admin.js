import { Link } from "react-router-dom";

const AdminSideBar = () => {
    return <>
    <div className="w-1/6 bg-slate-300 h-screen">
        <ul className="text-center font-semibold p-2 text-lg text-gray-700">
        <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "">DashBoard</Link></li>
        <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "eventManagerManagement">Event Manager Management</Link></li>
        <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "eventManagement">Event Management</Link></li>
        <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "travelAgencyManagement">Travel Agency Management</Link></li>
        <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "accommodationsManagement">Accommodations Management</Link></li>
        </ul>
    </div>
    </>
}

export default AdminSideBar;