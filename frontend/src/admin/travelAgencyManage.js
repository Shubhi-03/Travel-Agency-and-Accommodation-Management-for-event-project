import { useEffect, useState } from "react";
import useTravelAgencyList from "../hooks/useTravelAgency.js";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";



const TravelAgencyManagement = () => {
  useTravelAgencyList();
  const travelAgency = useSelector((store) => store.admin.travelAgency);
  console.log(travelAgency);

  const [showForm, setShowForm] = useState(false);
  const [agencies, setAgencies] = useState([]); 
  const [newAgency, setNewAgency] = useState({
    name: "",
    services: [],
    pointOfContact: [
      {
        name: "",
        PhoneNo: "",
        email: "",
        address: "",
      },
    ],
  });

  useEffect(() => {
    if (Array.isArray(travelAgency)) {
      setAgencies(travelAgency);
    } else {
      setAgencies([]);
    }
  }, [travelAgency]);

  const addAgency = async (e) => {
    e.preventDefault();
    const { name, pointOfContact, services } = newAgency;

    try {
      const response = await axios.post(
        "/api/v1/admin/addTravelAgency",
        { name, pointOfContact, services },
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        setAgencies((prev) => [...prev, response.data.data]);
      }
      toast.success(response.data.data.message)
      setShowForm(false);
      setNewAgency({
        name: "",
        services: [],
        pointOfContact: [{ name: "", PhoneNo: "", email: "", address: "" }],
      }); 
    }catch(error){
      console.log(error);
    }
  };

  const removeAgency = async (id) => {
    try {
      const response = await axios.post(`/api/v1/admin/removeTravelAgency?travelAgencyId=${id}`, {}, {
        withCredentials: true,
      });
  
      setAgencies((prev) => prev.filter((agency) => agency._id !== id)); 
      toast.success(response.data.message); 
    } catch (error) {
      console.error("Error removing agency:", error);
      toast.error("Failed to remove agency.");
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 mb-4"
      >
        Add New
      </button>

      <div className="grid grid-cols-3 gap-4">
      {agencies.map((agency) => (
  <div key={agency._id} className="bg-white rounded-lg shadow-md p-4 w-80">
    

    <h2 className="text-xl font-semibold text-gray-800 mt-3">
      {agency.name}
    </h2>
    <div className="mt-2">
      <ul className="list-disc list-inside text-sm text-gray-600">
      {agency?.services?.length > 0 && (
  <div className="mt-4">
    <span className="font-semibold text-gray-700">Services:</span>
    <ul className="list-disc list-inside text-sm text-gray-600">
      {agency?.services?.map((service, index) => (
        <li key={index}>{service}</li>
      ))}
    </ul>
  </div>
)}

      </ul>
    </div>
    {agency?.pointOfContact?.length > 0 && (
  <div className="mt-4">
    <span className="font-semibold text-gray-700">Point of Contact:</span>
    <div className="border p-2 rounded-md mt-2 bg-gray-100">
      <p className="text-sm text-gray-800">
        <span className="font-semibold">Name:</span> {agency?.pointOfContact?.[0]?.name || "N/A"}
      </p>
      <p className="text-sm text-gray-800">
        <span className="font-semibold">Phone:</span> {agency?.pointOfContact?.[0]?.PhoneNo || "N/A"}
      </p>
      <p className="text-sm text-gray-800">
        <span className="font-semibold">Email:</span> {agency?.pointOfContact?.[0]?.email || "N/A"}
      </p>
    </div>
  </div>
)}


    {/* Remove Button */}
    <button className="mt-4 w-full bg-gray-500 text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition">
      Remove
    </button>
  </div>
))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">New Travel Agency Information</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-600">
                &minus;
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={newAgency.name}
                onChange={(e) =>
                  setNewAgency((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <input
                type="text"
                placeholder="Contact Name"
                className="w-full p-2 border rounded"
                value={newAgency.pointOfContact[0].name}
                onChange={(e) =>
                  setNewAgency((prev) => ({
                    ...prev,
                    pointOfContact: [
                      { ...prev.pointOfContact[0], name: e.target.value },
                    ],
                  }))
                }
              />

              <input
                type="text"
                placeholder="Phone No."
                className="w-full p-2 border rounded"
                value={newAgency.pointOfContact[0].PhoneNo}
                onChange={(e) =>
                  setNewAgency((prev) => ({
                    ...prev,
                    pointOfContact: [
                      { ...prev.pointOfContact[0], PhoneNo: e.target.value },
                    ],
                  }))
                }
              />

              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-2 border rounded"
                value={newAgency.pointOfContact[0].email}
                onChange={(e) =>
                  setNewAgency((prev) => ({
                    ...prev,
                    pointOfContact: [
                      { ...prev.pointOfContact[0], email: e.target.value },
                    ],
                  }))
                }
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full p-2 border rounded"
                value={newAgency.pointOfContact[0].address}
                onChange={(e) =>
                  setNewAgency((prev) => ({
                    ...prev,
                    pointOfContact: [
                      { ...prev.pointOfContact[0], address: e.target.value },
                    ],
                  }))
                }
              />

              <input
                type="text"
                placeholder="Services (comma-separated)"
                className="w-full p-2 border rounded"
                value={newAgency.services.join(", ")}
                onChange={(e) =>
                  setNewAgency((prev) => ({
                    ...prev,
                    services: e.target.value.split(",").map((s) => s.trim()),
                  }))
                }
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={addAgency}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TravelAgencyManagement