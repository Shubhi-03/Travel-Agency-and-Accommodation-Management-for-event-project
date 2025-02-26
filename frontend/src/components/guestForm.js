import axios from "axios";
import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
const GuestForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guestId = searchParams.get("guestId");
  const eventId = searchParams.get("eventId");
    const [data, setData] = useState({
        departure_date : "", 
        departure_time : "", 
        location : "", 
        accommodation_days : "", 
        modeOfTravel : "", 
        comment : ""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const {departure_date, departure_time, location, accommodation_days, modeOfTravel, comment} = data;
        try{
            const response = await axios.post(`/api/v1/guests/guestForm?eventId=${eventId}&guestId=${guestId}`,
              {departure_date, departure_time, location, accommodation_days, modeOfTravel, comment},
              {withCredentials : true}
            )
            console.log(response)
            if(response.data.ApiError){
              toast.error(response.data.error.message || "Something went wrong while adding the details.")
             }else{
              setData({})
              toast.success("Details are added.")
              navigate("/")
             }
        }catch(error){
          toast.error(error.message)
        }
    }

    return <>
    <div className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg mt-5">
            <div className="flex flex-col ">
            <div className=" text-4xl font-bold text-gray-700 rounded-md text-center p-2 pb-7 border-b-2 border-gray-300">Travel and Accommodation Details</div>
            <form onSubmit={handleSubmit} className="flex flex-col text-center items-center text-black">
                <DatePicker
            selected={data.departure_date}
            onChange={(date) => setData({ ...data, departure_date: date })}
            dateFormat="yyyy-MM-dd" // Format to match input field
            placeholderText="Select Departure Date"
            className="m-3  mt-10 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        />
        <input
          type="Time"
          placeholder="Departure Time "
          value={data.departure_time}
          onChange={(e) => setData({ ...data, departure_time : e.target.value })}
          required
          className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
          />
            <input
          type="location"
          placeholder="Pick-Up Location"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          required
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <input
          type="accommodation_days"
          placeholder="Accommodation Days"
          value={data.accommodation_days}
          onChange={(e) => setData({ ...data, accommodation_days: e.target.value })}
          required
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
          
        
        <input
          type="modeOfTravel"
          placeholder="Mode of Travel"
          value={data.modeOfTravel}
          onChange={(e) => setData({ ...data, modeOfTravel: e.target.value })}
          required
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <input
          type="comment"
          placeholder="Comment"
          value={data.comment}
          onChange={(e) => setData({ ...data, comment: e.target.value })}
          required      
        className="m-3 w-10/12 rounded-sm pl-5 bg-gray-300 placeholder:text-gray-600 font-bold text-lg text-gray-900"
        /> 
        <div className="w-10/12 flex justify-end">
  
</div>
<div className="w-10/12 flex items-center">
<button type = "submit" className="w-1/6 text-md text-white font-bold p-1 bg-gray-800 rounded-md hover:bg-gray-600" >Submit</button>    
</div>
    </form>
    </div>
    </div>
    </>
}

export default GuestForm