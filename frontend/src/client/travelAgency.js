import { useSelector } from "react-redux";
import useTravelAgencyList from "../hooks/useTravelAgency.js";
import { useState } from "react";
import TravelBooking from "./travelBooking.js";

const TravelAgencyClient = () => {
  useTravelAgencyList();
  const travelAgencyList = useSelector((store) => store.admin.travelAgency);
const [selectedAgency, setSelectedAgency] = useState(null);

return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
    <div className="flex w-full gap-6">
      {selectedAgency && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[550px]">
          <button
              className="text-xl font-bold text-gray-600"
              onClick={() => setSelectedAgency(null)}
            >
              —
            </button>
            <TravelBooking
              travelAgency={selectedAgency}
              onClose={() => setSelectedAgency(null)}
            />
            
          </div>
        </div>
      )}

      {/* Travel Agency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelAgencyList.map((agency) => {
          const contact = agency.pointOfContact?.[0] || {};

          return (
            <div
              key={agency._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300 w-72"
            >
              {/* Image/Logo Placeholder */}
              <div className="bg-gray-200 h-32 flex items-center justify-center">
                <span className="text-gray-500">Travel Agency Logo</span>
              </div>

              {/* Agency Details */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {agency.name}
                </h3>

                {/* Contact Info */}
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

                {/* Services */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Services Offered:
                  </h4>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    {agency.services.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking Button */}
              <div className="bg-gray-100 text-center py-2">
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => setSelectedAgency(agency)}
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

export default TravelAgencyClient;
