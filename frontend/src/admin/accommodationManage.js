import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAccommodationList from "../hooks/useAccommodationList.js";
import toast from "react-hot-toast";
import axios from "axios";

const AccommodationsManagement = () =>{
  useAccommodationList();
  const accommodationList = useSelector((store)=>store.admin.accommodations);
  console.log("accommodationList from Redux:", accommodationList);

    const [showForm, setShowForm] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [newAccommodation, setNewAccommodation] = useState({
    name: "",
    address:"",
    amenities: [],
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
      if (Array.isArray(accommodationList)) {
        setAccommodations(accommodationList);
      } else {
        setAccommodations([]);
      }
    }, [accommodationList]);
    console.log("accommodations are", accommodations)
  const addAccommodation = async(e) => {
    const {name, address, amenities, pointOfContact} = newAccommodation;
    try {
      const response = await axios.post(
        "/api/v1/admin/addAccommodation",
        {name, address, amenities, pointOfContact},
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        setAccommodations((prev) => [...prev, response.data.data]);
      }
      toast.success(response.data.data.message)
      setShowForm(false);
      setNewAccommodation({
        name: "", address:"", amenities: "", pointOfContact: [
          {
            name: "", PhoneNo: "", email: "", address: "",
          },
        ],
      }); 
    }catch(error){
      console.log(error);
    }
  };

  const removeAccommodation = async(id) => {
    try {
      const response = await axios.post(`/api/v1/admin/removeAccomodations?accommodationId=${id}`, {}, {
        withCredentials: true,
      });
  
      setAccommodations((prev) => prev.filter((accommodation) => accommodation._id !== id)); 
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
      {accommodations.map((accommodation) => (
  <div key={accommodation._id} className="bg-white rounded-lg shadow-md p-4 w-80">
    {/* Image Section */}
    {accommodation.images.length > 0 ? (
      <img
        src={accommodation.images[0]} // Display the first image
        alt={accommodation.name}
        className="w-full h-40 object-cover rounded-md"
      />
    ) : (
      <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
        <span className="text-gray-600">No Image Available</span>
      </div>
    )}

    {/* Accommodation Details */}
    <h2 className="text-xl font-semibold text-gray-800 mt-3">
      {accommodation.name}
    </h2>

    <p className="text-sm text-gray-600">
      <span className="font-semibold">Address:</span> {accommodation.address || "N/A"}
    </p>

    {/* Amenities */}
    <div className="mt-2">
      <span className="font-semibold text-gray-700">Amenities:</span>
      <ul className="list-disc list-inside text-sm text-gray-600">
        {accommodation.amenities.length > 0
          ? accommodation.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))
          : <li>No amenities listed</li>}
      </ul>
    </div>

    {/* Point of Contact */}
    {accommodation.pointOfContact.length > 0 && (
      <div className="mt-4">
        <span className="font-semibold text-gray-700">Point of Contact:</span>
        <div className="border p-2 rounded-md mt-2 bg-gray-100">
          <p className="text-sm text-gray-800">
            <span className="font-semibold">Name:</span> {accommodation.pointOfContact[0].name}
          </p>
          <p className="text-sm text-gray-800">
            <span className="font-semibold">Phone:</span> {accommodation.pointOfContact[0].PhoneNo}
          </p>
          <p className="text-sm text-gray-800">
            <span className="font-semibold">Email:</span> {accommodation.pointOfContact[0].email}
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
              <h2 className="text-lg font-bold">New Accommodation Information</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-600">
                &minus;
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={newAccommodation.name}
                onChange={(e) =>
                  setNewAccommodation((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Contact Name"
                className="w-full p-2 border rounded"
                value={newAccommodation.pointOfContact[0].name}
                onChange={(e) =>
                  setNewAccommodation((prev) => ({
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
                value={newAccommodation.pointOfContact[0].PhoneNo}
                onChange={(e) =>
                  setNewAccommodation((prev) => ({
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
                value={newAccommodation.pointOfContact[0].email}
                onChange={(e) =>
                  setNewAccommodation((prev) => ({
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
                value={newAccommodation.pointOfContact[0].address}
                onChange={(e) =>
                  setNewAccommodation((prev) => ({
                    ...prev,
                    pointOfContact: [
                      { ...prev.pointOfContact[0], address: e.target.value },
                    ],
                  }))
                }
              />

              <input
                type="text"
                placeholder="Amenities (comma-separated)"
                className="w-full p-2 border rounded"
                value={newAccommodation.amenities.join(", ")}
                onChange={(e) =>
                  setNewAccommodation((prev) => ({
                    ...prev,
                    amenities: e.target.value.split(",").map((s) => s.trim()),
                  }))
                }
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={addAccommodation}
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
}

export default AccommodationsManagement