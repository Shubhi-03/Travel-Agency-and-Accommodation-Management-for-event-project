import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateAnEvent = () => {
    const [data, setData] = useState({
                name: "",
                venue:"",
                budget : "",
                startDate : "",
                endDate : "",
                description : "",
                client : [
                  {
                    name: "",
                    email: "",
                    phoneNumber: "",
                    modeOfTravel: "",
                    accommodationDays: ""
                  }
                ]
              })
    const navigate = useNavigate();
    const handleAddClient = () => {
      setData((prev) => ({
        ...prev,
        client: [
          ...(Array.isArray(prev.client) ? prev.client : []),
          { 
            name: "",
            email: "",
            phoneNumber: "",
            modeOfTravel: "",
            accommodationDays: ""
          },
        ],
      }));
      console.log(data.client)
  };

  const updateClient = (index, e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    const updatedClients = [...data.client];
    updatedClients[index][name] = value; // Update the client's field
    setData((prev) => ({
      ...prev,
      client: updatedClients,
    }));
  };
  
  
  
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, venue, budget, startDate, endDate, description, client} = data
        try{
         const response = await axios.post('/api/v1/events/createAnEvent',
          {name, venue, budget, startDate, endDate, description, client},
          {withCredentials : true}
         ) 
         if(response.data.ApiError){
          toast.error(response.data.error.message || "Somethong went wrong while creating an Event.")
         }else{
          setData({})
          toast.success("Event is Created.")
          navigate("/eventManager/events")
         }
        }catch(error){
          toast.error(error.message)
        }
        
    }
    return <>
    <div className="flex items-center justify-center ">
    <div className="w-10/12 shadow-lg ">
        
        <form onSubmit={handleSubmit} className="flex flex-col text-center items-center text-black">
         <div className="text-3xl font-bold text-gray-700">Create An Event</div> 
         <input
          type="name"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <input
          type="venue"
          placeholder="Venue"
          value={data.venue}
          onChange={(e) => setData({ ...data, venue: e.target.value })}
          className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
          /> 
          <div className="flex">
            <input
          type="startDate"
          placeholder="Startdate"
          value={data.startDate}
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <input
          type="endDate"
          placeholder="EndDate"
          value={data.endDate}
          onChange={(e) => setData({ ...data, endDate: e.target.value })}
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
          </div>
        
        <input
          type="description"
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <input
          type="budget"
          placeholder="Budget"
          value={data.budget}
          onChange={(e) => setData({ ...data, budget: e.target.value })}
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <div className="w-10/12 flex justify-end">
  <button
    className="w-1/6 text-md text-white font-bold p-1 bg-gray-800 rounded-md hover:bg-gray-600"
    onClick={handleAddClient}
  >
    Add Client
  </button>
</div>

{/* Map through client array and render inputs */}
{data?.client?.map((client, index) => (
  <div key={index} className="p-4 rounded-md mt-2">
    <input
      type="text"
      name="name" // Make sure each input has a "name" attribute
      placeholder="Name"
      value={client.name}
      onChange={(e) => updateClient(index, e)} // Pass the event properly
      className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={client.email}
      onChange={(e) => updateClient(index, e)} // Pass the event properly
      className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
    />
    <input
      type="text"
      name="phoneNumber"
      placeholder="Phone Number"
      value={client.phoneNumber}
      onChange={(e) => updateClient(index, e)} // Pass the event properly
      className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
    />
    <input
      type="text"
      name="modeOfTravel"
      placeholder="Mode Of Travel"
      value={client.modeOfTravel}
      onChange={(e) => updateClient(index, e)} // Pass the event properly
      className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
    />
    <input
      type="number"
      name="accommodationDays"
      placeholder="No. Of Accommodation Days"
      value={client.accommodationDays}
      onChange={(e) => updateClient(index, e)} // Pass the event properly
      className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
    />
  </div>
))}


        <div className="w-10/12 flex justify-end">
        <button type = "submit" className="w-1/6 text-md text-white font-bold p-1 bg-gray-800 rounded-md hover:bg-gray-600" >Submit</button>    
        </div>
        </form>
    </div>
    </div>
    </>
}

export default CreateAnEvent