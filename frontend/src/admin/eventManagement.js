import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAllEvents from "../hooks/useAllEvents.js";

const EventManagement = () =>{
  useAllEvents();
  const events = useSelector((store)=>store.admin.event);
  console.log(events)
  const [formData, setFormData] = useState([]);
  useEffect(() => {
      setFormData(events);
    }, [events]);
  const handleCancelButton = async(id)=>{
    const response = await axios.post(`/api/v1/admin/removeEvents?eventId=${id}`,{}, {withCredentials:true})
    console.log(response);
    setFormData((prev) => prev.filter((event) => event._id !== id));
    toast.success(response.data.message);
    if(response.data.ApiError) toast.error(response.data.message);
  }
    return<>
<div className="bg-gray-200 p-4 rounded-lg shadow-md w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-gray-800">
            <th className="p-2">S.no.</th>
            <th className="p-2">Event</th>
            <th className="p-2">Venue</th>
            <th className="p-2">Date</th>
            <th className="p-2">Budget</th>
            <th className="p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(formData) && formData.map((e, index) => (
  <tr key={index} className="text-center border-t">
    <td className="p-2">{index+1}</td> 
    <td className="p-2">{e.name}</td>
    <td className="p-2">{e.venue}</td>
    <td className="p-2">{new Date(e.startDate).toLocaleDateString()}</td>
    <td className="p-2">{e.budget}</td>
    <td className="p-2">
      <button className="bg-gray-500 text-white px-3 py-1 rounded shadow-md hover:bg-gray-600" onClick={() => handleCancelButton(e._id)}>
        Cancel
      </button>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
    </>
}

export default EventManagement