import { useSelector } from "react-redux"
import useEventList from "../hooks/useEventsList.js";
import { useState } from "react";

const EventManagerDashboard = () =>{
    useEventList();
    const info = useSelector((store) => store.user.info.data.data.user)
    const events = useSelector((store) => store?.event.event);
    const [activeTab, setActiveTab] = useState("upcoming");
        const currentTime = Date.now();
        const upcomingEvents = events.filter(event => new Date(event.endDate).getTime() > currentTime);
        const previousEvents = events.filter(event => new Date(event.endDate).getTime() <= currentTime);
        const EventTable = ({ events }) => (
          <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="p-3 border">S.no.</th>
                  <th className="p-3 border">Event</th>
                  <th className="p-3 border">Venue</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Budget</th>
                  <th className="p-3 border">Description</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event._id}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border font-semibold">{event.name}</td>
                    <td className="p-3 border">{event.venue}</td>
                    <td className="p-3 border">
                      {event.startDate?.split("T")[0] || "N/A"}
                    </td>
                    <td className="p-3 border">₹{event.budget}</td>
                    <td className="p-3 border">{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
         
    return<>
    <div className="flex flex-col bg-slate-200 items-center h-2/4">
       <div className="flex bg-slate-200 items-center justify-between p-5">
        <div>
         {!info.profilePicture && <img width="250" height="250" src="https://img.icons8.com/fluency/48/test-account--v1.png" alt="test-account--v1"/>} 
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg w-9/12 ">
      <div className="grid grid-cols-2 gap-6">
        
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Name</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
            {info.name}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">E-mail</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
            {info.email}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Phone Number</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
            {info.phoneNumber}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Date of Joining</span>
          <span className="bg-gray-300 text-black font-bold text-lg p-1 rounded-md">
          {new Date(info.updatedAt).toISOString().split("T")[0]}
          </span>
        </div>

      </div>
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

      <div className="p-5 w-full flex flex-col items-center">
  {activeTab === "upcoming" ? (
    upcomingEvents.length === 0 ? (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">📅 No upcoming events found.</p>
      </div>
    ) : (
      <EventTable events={upcomingEvents} />
    )
  ) : previousEvents.length === 0 ? (
    <div className="text-center py-10">
      <p className="text-gray-500 text-lg">📌 No previous events found.</p>
    </div>
  ) : (
    <EventTable events={previousEvents} />
  )}
</div>

        </div> 
    
    
    </>
}

export default EventManagerDashboard