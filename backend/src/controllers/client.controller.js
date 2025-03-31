import { booking } from "../models/bookings.models.js";
import { Event } from "../models/events.models.js";
import { Guest } from "../models/guests.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  jwt from "jsonwebtoken";
import  nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    secure : true,
    host : "smtp.gmail.com",
    port : 465,
    auth : {
        user: "shubhimaurya226@gmail.com",
        pass: "ycpwmyikwxxcpaia"
    }
    
})
const sendMail = async(to, subject,text, html) => {
    try{
        
            const mailOptions = {
                from: `"InsideOut" <${process.env.EMAIL_SERVICE_ID}>`,
                to,
                subject,
                text,
                html
            };
        
        const info = await transporter.sendMail(mailOptions)
    }catch(error){
        throw new ApiError(500, (error.message));
    }
}

const getGuestList = asyncHandler(async (req, res, next) => {
  const { eventId } = req.query;  // Correctly extract eventId
  console.log("Received email:", eventId);
  if (!eventId) {
    throw new ApiError(400, null, "Event Id is missing.");
  }

  const guests = await Guest.find({ event: eventId });

  if (guests.length === 0) {
    return res.status(200).json(new ApiResponse(200, guests, "Guest List is empty."));
  }

  return res.status(200).json(new ApiResponse(200, guests, "List is fetched successfully."));
});


const getEvents = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.query;
    console.log("Received email:", email); // Debugging

    if (!email) {
        throw new ApiError(400, null, "Please provide an email.");
    }

      const clientEvents = await Event.find({ "client.email": email  }).sort({ createdAt: -1 });
      console.log("clients", clientEvents)
      if (clientEvents.length === 0) {
          return res.status(200).json(new ApiResponse(200, [], "Event list is empty."));
      }

      return res.status(200).json(new ApiResponse(200, clientEvents, "Event list is ready."));
  } catch (error) {
      return res
          .status(500)
          .json(new ApiResponse(500, error.message, "Something went wrong while fetching the events."));
  }
});

const addGuest = asyncHandler(async (req, res, next) => {
  const { eventId } = req.query;
  const { name, email, phoneNumber } = req.body;

  if (!eventId) {
      throw new ApiError(400, null, "Event ID is missing.");
  }
  if (!name || !email || !phoneNumber) {
      throw new ApiError(400, null, "All fields are required.");
  }

  const guest = await Guest.create({
      name,
      email,
      phoneNumber,
      formStatus: false,
      event: eventId
  });

  if (!guest) {
      throw new ApiError(400, null, "Something went wrong while adding a guest.");
  }

  const event = await Event.findById(eventId);
  if (!event) {
      throw new ApiError(400, null, "Event is missing.");
  }

  const formattedDate = new Date(event.startDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
  });

  try {
    await sendMail(
        guest.email,
        `Invitation for Event: ${event.name}`,
        `Greetings,\nYou are cordially invited to the event "${event.name}", scheduled on ${formattedDate} at ${event.venue}.\nFill out the form for more travel and accommodation details.`,
        `<div>
            <h1>Greetings,</h1>
            <p>You are cordially invited to the event <strong>${event.name}</strong>, scheduled on <strong>${formattedDate}</strong> at <strong>${event.venue}</strong>.</p>
            <p>Please fill out the form for travel and accommodation details.</p>
            <p><a href="http://localhost:3001/guestForm?guestId=${guest._id}&eventId=${event._id}">Fill the Form</a></p>
         </div>`
    );
} catch (error) {
    console.error("Error sending invitation email:", error);
    throw new ApiError(500, null, "Failed to send invitation email.");
}

  return res.status(200).json(new ApiResponse(200, guest, "Guest added successfully."));
});

const getUnbookedGuests = asyncHandler(async (req, res, next) => {
    try {
        const bookedGuestIds = await booking.distinct('guest', { guest: { $ne: null } });
        console.log("Booked Guest IDs:", bookedGuestIds);

        const allGuests = await Guest.find(); // Fetch all guests with details
        console.log("All Guests:", allGuests);

        const bookedGuestIdsSet = new Set(bookedGuestIds.map(id => id.toString()));

        // Filter guests who are NOT in bookedGuestIds
        const unbookedGuests = allGuests.filter(guest => !bookedGuestIdsSet.has(guest._id.toString()));

        console.log("Unbooked Guests:", unbookedGuests);

        return res.status(200).json(new ApiResponse(200, unbookedGuests, "Successfully retrieved unbooked guests."));
    } catch (error) {
        console.error("Error in getUnbookedGuests:", error);
        return next(new ApiError(500, "Error fetching guest details"));
    }
});



export { getGuestList, getEvents, addGuest, getUnbookedGuests };
