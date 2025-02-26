import { useSelector } from "react-redux";
import useClientEvent from "../hooks/useClientEvents.js";
import useGuestList from "../hooks/useGuestList.js";
import EventContainer from "./eventContainer.js";

const ClientEvents = () =>{
    let {info} = useSelector((store) => store.user)
    info = info.data.data.user
    useClientEvent(info.email);
    const events = useSelector((store)=>store?.client?.event)
    const latestEvent = events[0]
    useGuestList(latestEvent?._id);
    const guestList = useSelector((store)=>store?.client?.guestList)
    

    return <>
        <div className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg">
            <EventContainer event = {latestEvent} guestList={guestList}/>
           </div>
    </>
}

export default ClientEvents