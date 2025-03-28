import { useState } from "react"
import { useSelector } from "react-redux"
import useClientEvent from "../hooks/useClientEvents.js"

const ClientDashboard = () =>{
    const info = useSelector((store) => store.user)
    info = info.data.data.user
    console.log(info)
    useClientEvent(info.email)
    const events = useSelector((store)=>store?.client?.event)
    console.log(events)
    const [activeTab, setActiveTab] = useState("upcoming");
    const currentTime = Date.now();
    const upcomingEvents = events.filter(event => new Date(event.endDate).getTime() > currentTime);
    const previousEvents = events.filter(event => new Date(event.endDate).getTime() <= currentTime);
    const EventTable = ({ events }) => (
      <div className="bg-gray-300 p-4 rounded-lg overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-400">
              <th className="p-2 border">S.no.</th>
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Venue</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Budget</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{event.name}</td>
                <td className="p-2 border">{event.venue}</td>
                <td className="p-2 border">{event.startDate?.split("T")[0] || "N/A"}</td>
                <td className="p-2 border">{event.budget}</td>
                <td className="p-2 border">{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    return<>
    <div className="flex flex-col">
      <div className="flex bg-slate-200 items-center justify-between p-5">
        
        <div>
          {!info.profilePicture && (
            <img
              width="250"
              height="250"
              src="https://img.icons8.com/fluency/48/test-account--v1.png"
              alt="test-account"
            />
          )}
        </div>

        <div className="flex flex-col bg-white m-10 w-2/3 p-5 rounded-md shadow-md">
          <div className="m-5 text-lg rounded-sm shadow-md font-medium bg-slate-200 px-4 py-2 text-center">
            {info.name}
          </div>
          <ul className="flex justify-between text-center">
            <li className="m-5 text-lg rounded-sm shadow-md font-medium bg-slate-200 px-4 py-2">
              {info.email}
            </li>
            <li className="m-5 text-lg rounded-sm shadow-md font-medium bg-slate-200 px-4 py-2">
              {info.phoneNumber}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex space-x-6 border-b border-gray-300 text-black font-semibold px-5 mt-5">
        <button
          className={`relative pb-2 ${
            activeTab === "upcoming" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
          {activeTab === "upcoming" && (
            <span className="absolute left-0 bottom-0 w-full h-1 bg-gray-500"></span>
          )}
        </button>

        <button
          className={`relative pb-2 ${
            activeTab === "previous" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("previous")}
        >
          Previous Events
          {activeTab === "previous" && (
            <span className="absolute left-0 bottom-0 w-full h-1 bg-gray-500"></span>
          )}
        </button>
      </div>

      <div className="p-5">
    {activeTab === "upcoming" ? (
      upcomingEvents.length === 0 ? (
        <p className="text-center text-gray-600">No upcoming events.</p>
      ) : (
        <EventTable events={upcomingEvents} />
      )
    ) : previousEvents.length === 0 ? (
      <p className="text-center text-gray-600">No previous events.</p>
    ) : (
      <EventTable events={previousEvents} />
    )}
  </div>
    </div>

    </>
}

export default ClientDashboard