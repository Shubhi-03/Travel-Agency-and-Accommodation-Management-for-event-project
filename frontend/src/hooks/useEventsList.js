import axios from "axios";
import { useDispatch } from "react-redux";
import { addEvent } from "../utils/eventSlice.js";
import { useEffect } from "react";
const useEventList = () =>{
    const dispatch = useDispatch();
    const getEventlist = async() => {
     const response = await axios.get("/events/getEventlist", {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }});
        const events = response.data.data;
        dispatch(addEvent(events));
    }
    useEffect(()=>{
        getEventlist()
    }, [])
    
}

export default useEventList;