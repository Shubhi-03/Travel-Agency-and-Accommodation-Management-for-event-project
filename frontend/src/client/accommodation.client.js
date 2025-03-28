import { useSelector } from "react-redux";
import useAccommodationList from "../hooks/useAccommodationList.js";
import { useState } from "react";
import TravelBooking from "./travelBooking.js";


const AccommodationClient = () => {
  useAccommodationList();
  const accommodationList = useSelector((store) => store.admin?.accommodations);
  console.log(accommodationList)
const [selectedAccomodation, setSelectedAccommodation] = useState(null);

return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
    <div className="flex w-full gap-6">
      {selectedAccomodation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[550px]">
          <button
              className="text-xl font-bold text-gray-600"
              onClick={() => setSelectedAccommodation(null)}
            >
              —
            </button>
            <TravelBooking
              travelAgency={selectedAccomodation}
              onClose={() => setSelectedAccommodation(null)}
            />
            
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodationList.map((a) => {
          const contact = a.pointOfContact?.[0] || {};

          return (
            <div
              key={a._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300 w-72"
            >
              <div className="bg-gray-200 h-32 flex items-center justify-center">
                <span className="text-gray-500">Accommodation Logo</span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {a.name}
                </h3>

                <div className="mt-2 text-gray-600 text-sm">
                  <p className="flex items-center gap-2">
                    📞 {contact.PhoneNo || "Not Available"}
                  </p>
                  <p className="flex items-center gap-2">
                    ✉️ {contact.email || "Not Available"}
                  </p>
                  <p className="flex items-center gap-2">
                    🏠 {contact.address || "Not Available"}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Services Offered:
                  </h4>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    {a.amenities.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-100 text-center py-2">
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => setSelectedAccommodation(a)}
                >
                  Request a Booking
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};

export default AccommodationClient;
