import { useSelector } from "react-redux";
import useEventManagerList from "../hooks/useEventManagerList.js"
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const EventManagerManagement = () => {
  useEventManagerList(); // Fetch event manager list
  const eventManagers = useSelector((store) => store?.admin?.eventManager);
  const [formData, setFormData] = useState([]);

  // Sync formData with Redux store
  useEffect(() => {
    setFormData(eventManagers);
  }, [eventManagers]);

  const handleCancelButton = async (id) => {
    try {
      const response = await axios.post(
        `/api/v1/admin/removeEventManager?eventManagerId=${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.ApiError) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        
        setFormData((prev) => prev.filter((manager) => manager._id !== id));
      }
    } catch (error) {
      console.error("Error deleting event manager:", error);
      toast.error("Failed to delete event manager.");
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-gray-800">
            <th className="p-2">S.no.</th>
            <th className="p-2">Event Manager</th>
            <th className="p-2">E-mail</th>
            <th className="p-2">Phone No.</th>
            <th className="p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(formData) &&
            formData.map((e, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{e.name}</td>
                <td className="p-2">{e.email}</td>
                <td className="p-2">{e.phoneNumber}</td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600"
                    onClick={() => handleCancelButton(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};


export default EventManagerManagement