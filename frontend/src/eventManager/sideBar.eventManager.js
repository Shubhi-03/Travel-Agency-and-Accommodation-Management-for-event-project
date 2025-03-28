import { Link } from "react-router-dom";

const SideBar = () => {
    return <>
    <div className="w-1/6 bg-slate-300 h-screen">
        <ul className="text-center font-semibold p-2 text-lg text-gray-700">
            <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "">DashBoard</Link></li>
            <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "createAnEvent">Create An Event</Link></li>
            <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "events">Events</Link></li>
            <li className="bg-slate-400 m-3 rounded-md p-1"><Link to = "budget">Budget</Link></li>
        </ul>
    </div>
    </>
}

export default SideBar;