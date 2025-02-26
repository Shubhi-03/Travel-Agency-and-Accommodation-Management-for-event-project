import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addGuestList } from "../utils/clientSlice.js";

// const useGuestList = (eventId) => {
//   const dispatch = useDispatch();

//   const getEventlist = async () => {
//     try {
//       const response = await axios.get(`/api/v1/clients/getGuest?eventId=${eventId}`, {
//         withCredentials: true,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//       const events = response.data.data;
//       dispatch(addGuestList(events));
//     } catch (error) {
//       console.error("Error fetching events: ", error);
//     }
//   };
//   useEffect(() => {
//     getEventlist();
//   }, 
//   // eslint-disable-next-line
//   []);
// };

const useGuestList = (eventId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!eventId) return; // Don't fetch if eventId is undefined

    const getEventList = async () => {
      try {
        const response = await axios.get(`/api/v1/clients/getGuest?eventId=${eventId}`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        dispatch(addGuestList(response.data.data));
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    getEventList();
  }, [eventId]); // Runs only when eventId updates
};


export default useGuestList;
