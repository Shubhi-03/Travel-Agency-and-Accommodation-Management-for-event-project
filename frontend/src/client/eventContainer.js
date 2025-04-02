import axios from "axios";
import { Minus, PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const EventContainer = ({event, guestList}) =>{
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        name:"", 
        email:"",
        phoneNumber:""
    })
    const addGuest = async(e) => {
        setIsOpen(!isOpen)
    };
      const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, email, phoneNumber} = data
        console.log(event._id)
        try{
            const response = await axios.post(`/api/v1/clients/addGuest?eventId=${event._id}`, 
                        {name, email, phoneNumber}, {withCredentials : true}
            )
            toast.success(response.data.message)
            setIsOpen(!isOpen)
        }catch(error){
                toast.error(error.message)
        }
      }
    return <>
    <div className="flex flex-col ">
            <div className=" text-3xl font-bold text-gray-700 rounded-md text-center p-2">{event?.name}</div>
            {/* <div className="flex justify-between m-14 text-center">
                <div className="bg-white text-xl font-semibold text-gray-700 rounded-md w-2/5 p-2">{event?.startDate.split("T")[0]}</div>
                <div className="bg-white text-xl font-semibold text-gray-700 rounded-md w-2/5 p-2">{event?.venue}</div>
            </div> */}
            <div className="p-6 ">
      <div className="grid grid-cols-2 gap-6">
        
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Start Date</span>
          <span className="bg-gray-300 text-gray-700 font-bold text-lg p-1 rounded-md text-center">
          {event?.startDate.split("T")[0]}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Venue</span>
          <span className="bg-gray-300 text-gray-700 font-bold text-lg p-1 rounded-md text-center">
          {event?.venue}
          </span>
        </div>
      </div>
    </div>
            <div className="text-2xl font-bold text-gray-700 rounded-md text-left p-2 border-t-2 border-b-2 border-gray-300 mt-6 mb-6">Guest Details:</div>
            <div className="flex gap-4 mb-4 items-end">
        <button  className="flex items-center font-medium text-lg gap-2 px-2 py-1 bg-gray-500 hover:bg-gray-700 text-white rounded" onClick={()=>addGuest()}>
          <PlusIcon size={18} /> Add guest
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-1/2 left-1/3 bg-white shadow-lg rounded-lg p-4 w-2/5">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-center text-lg font-semibold flex-1">
              Guest Information
            </h2>
            <button
              className="text-xl font-bold text-gray-600"
              onClick={() => setIsOpen(false)}
            >
            <Minus size={18}/>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 mt-3">
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="p-2 bg-gray-200 rounded-md font-semibold"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="p-2 bg-gray-200 rounded-md font-semibold"
            />
            <input
              type="text"
              placeholder="Phone No."
              value={data.phoneNumber}
              onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
              className="p-2 bg-gray-200 rounded-md font-semibold"
            />
          </div>
          <button type = "submit" className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md w-full">
            Send Invite
          </button>
          </form>
          

          
        </div>
      )}
      <table className="w-full ">
        <thead className="bg-gray-300 text-gray-700">
          <tr>
            <th className=" p-2">S.no</th>
            <th className=" p-2">Guest Name</th>
            <th className=" p-2">Phone No.</th>
            <th className=" p-2">Email</th>
            <th className=" p-2">Form Status</th>
            <th className=" p-2"></th>
          </tr>
        </thead>
        <tbody>
        {guestList.map((guest, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{guest.name}</td>
              <td className="border p-2">{guest.email}</td>
              <td className="border p-2">{guest.phoneNumber}</td>
              <td className="border p-2">{guest.formStatus?"Submitted":"Pending"}</td>
              </tr>
        ))}
        </tbody>
        </table>
            </div>
    </>
}

export default EventContainer;