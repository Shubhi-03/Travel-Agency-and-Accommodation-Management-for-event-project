import { useSelector } from "react-redux";
import useEventList from "../hooks/useEventsList.js";
import { useState } from "react";
import React from "react";

const Events = () => {
  useEventList();
  const [visibleDetails, setVisibleDetails] = useState(null); 

  const showDetails = (index) => {
    setVisibleDetails(visibleDetails === index ? null : index);
  };

  const events = useSelector((store) => store?.event.event);
  console.log("events are", events);

  return (
    <div className="bg-gray-100 p-5">
      <div className="overflow-x-auto flex">
        <table className="min-w-full bg-gray-200 rounded-lg shadow-md justify-center">
          <thead>
            <tr className="bg-gray-300 text-center">
              <th className="px-4 py-2 font-bold">S.no.</th>
              <th className="px-4 py-2 font-bold">Event Name</th>
              <th className="px-4 py-2 font-bold flex items-center">
                Start Date
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 inline-block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-.001V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM5 7h10v10H5V7z" />
                </svg>
              </th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 font-bold">Venue</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event, index) => (
              <React.Fragment key={event.id || index}>
                <tr className="text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{event.name}</td>
                  <td className="px-4 py-2">
                    {new Date(event.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{event.description}</td>
                  <td className="px-4 py-2">{event.venue}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                      onClick={() => showDetails(index)}
                    >
                      {visibleDetails === index ? "Hide" : "Details"}
                    </button>
                  </td>
                </tr>
                {visibleDetails === index && (
  <tr>
    <td colSpan="6" className="px-4 py-2 bg-gray-100">
      <table className="w-full text-sm border-t border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="px-4 py-2 font-bold">S.no.</th>
            <th className="px-4 py-2 font-bold">Name</th>
            <th className="px-4 py-2">E-mail</th>
            <th className="px-4 py-2 font-bold">Phone Number</th>
            <th className="px-4 py-2">Accommodation Days</th>
            <th className="px-4 py-2">Mode of Travel</th>
          </tr>
        </thead>
        <tbody>
          {event.client.map((client, index) => (
            <tr key={client.id || index} className="text-center">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{client.name}</td>
              <td className="px-4 py-2">{client.email}</td>
              <td className="px-4 py-2">{client.phoneNumber}</td>
              <td className="px-4 py-2">{client.accommodationDays}</td>
              <td className="px-4 py-2">{client.modeOfTravel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  </tr>
)}

              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
