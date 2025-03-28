import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAllEvents from "../hooks/useAllEvents.js";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const user = useSelector((store) => store.user.info.data.data.user);
  useAllEvents();
  const events = useSelector((store) => store.admin.event);

  // Determine the most recent event based on endDate
  const mostRecentEvent = events.reduce((latest, event) => {
    const eventEndDate = new Date(event.endDate);
    return eventEndDate > new Date(latest.endDate) ? event : latest;
  }, events[0]);

  const [clients, setClients] = useState(mostRecentEvent ? mostRecentEvent.client : []);

  useEffect(() => {
    if (mostRecentEvent) {
      setClients(mostRecentEvent.client);
    }
  }, [mostRecentEvent]);

  const removeClient = async (id) => {
    try {
      const response = await axios.post(
        `/api/v1/admin/removeEvents?clientId=${id}`,
        {},
        { withCredentials: true }
      );
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error("An error occurred while removing the client.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg">
      {/* User Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
            👤
          </div>
          <p className="mt-2 font-semibold">{user.name}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>

        {/* Event Statistics */}
        <div className="col-span-2 flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <svg className="w-16 h-16" viewBox="0 0 36 36">
            <path
              className="text-gray-300 stroke-current"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831"
            />
            <path
              className="text-blue-600 stroke-current"
              strokeWidth="3"
              fill="none"
              strokeDasharray="25, 100"
              d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831"
            />
            <text x="18" y="20.35" textAnchor="middle" className="text-xs font-bold">
              25%
            </text>
          </svg>

          <div>
            <p>
              Registered Events: <strong>100</strong>
            </p>
            <p>
              Organized Events: <strong>25</strong>
            </p>
          </div>
        </div>
      </div>

      {mostRecentEvent && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-3xl text-gray-700 font-bold text-center border-b-2 pb-4 m-4">Recent Event</h2>
          <h2 className="text-xl font-bold">{mostRecentEvent.name}</h2>
          <p className="text-sm">
            Start Date: <strong>{new Date(mostRecentEvent.startDate).toLocaleDateString()}</strong>
          </p>
          <p className="text-sm">
            End Date: <strong>{new Date(mostRecentEvent.endDate).toLocaleDateString()}</strong>
          </p>
          <p className="text-sm">
            Venue: <strong>{mostRecentEvent.venue}</strong>
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Clients</h3>
            <table className="w-full border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Client</th>
                  <th className="border p-2">E-mail</th>
                  <th className="border p-2">Phone No</th>
                  <th className="border p-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client.id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{client.name}</td>
                    <td className="border p-2">{client.email}</td>
                    <td className="border p-2">{client.phoneNumber}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => removeClient(client.id)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
