import { booking } from "../models/bookings.models.js";
import { TravelAgency } from "../models/travelAgency.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  nodemailer from "nodemailer";
import mongoose from "mongoose";
import { Guest } from "../models/guests.models.js";


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
const createATravelAgencyBooking = asyncHandler(async (req, res) => {
    const { guest, travelDetails, status, approvalStatus } = req.body;
    const { travelAgency } = req.params;

    if (!travelAgency) throw new ApiError(400, "Travel Agency is missing.");
    if (!travelDetails) throw new ApiError(400, "Travel Details are important.");

    // Fetch guest with populated event
    const guestData = await Guest.findById(guest).populate("event");
    if (!guestData || !guestData.event) throw new ApiError(404, "Event not found.");
    const event = guestData.event;

    // Create booking
    const travelAgencyBooking = await booking.create({
        guest: guestData._id,  // ✅ Fix: Use correct guest ID
        travelDetails,
        travelAgency,
        status,
        approvalStatus
    });

    // Find travel agency
    const agency = await TravelAgency.findById(travelAgency);
    if (!agency) throw new ApiError(404, "Travel Agency not found.");

    try {
        await sendMail(
            guestData.email, // ✅ Fix: Use guestData.email
            `Travelling confirmation for Event: ${event.name}`,
            `Greetings,\nYou are cordially invited to the event "${event.name}", scheduled on ${event.date} at ${event.venue}.\nFill out the form for more travel and accommodation details.`,
            `<div>
                <h1>Greetings,</h1>
                <p>You are cordially invited to the event <strong>${event.name}</strong>, scheduled on <strong>${event.date}</strong> at <strong>${event.venue}</strong>.</p>
                <p>Please fill out the form for travel and accommodation details.</p>
                <p><a href="http://localhost:3001/guestForm?guestId=${guestData._id}&eventId=${event._id}">Fill the Form</a></p>
             </div>`
        );

        await sendMail(
            agency.pointOfContact[0]?.email, 
            `New Travel Booking Request for ${event.name}`,
            `Hello,\nA new travel booking request has been submitted for the event "${event.name}".\nPlease review the details and approve the request.`,
            `<div>
                <h1>Hello,</h1>
                <p>A new travel booking request has been submitted for the event <strong>${event.name}</strong>.</p>
                <p>Details:</p>
                <ul>
                    <li><strong>Guest:</strong> ${guestData.name}</li>  <!-- ✅ Fix: Use guestData -->
                    <li><strong>Email:</strong> ${guestData.email}</li>
                    <li><strong>Phone:</strong> ${guestData.phoneNumber}</li>
                    <li><strong>Event Date:</strong> ${event.date}</li>
                    <li><strong>Venue:</strong> ${event.venue}</li>
                </ul>
                <p>Please review and approve the request by clicking the link below:</p>
                <p><a href="http://localhost:3001/travelAgency/approve?bookingId=${travelAgencyBooking._id}">Approve Booking</a></p>
             </div>`
        );

    } catch (error) {
        console.error("Error sending emails:", error);
        throw new ApiError(500, "Failed to send emails.");
    }

    return res.status(200).json(new ApiResponse(200, travelAgencyBooking, "Booking request is sent."));
});


const createAccommodationBooking = asyncHandler(async(req, res)=>{
    const {name, accommodationDetails, status, approvalstatus} = req.body;
    const {accommodation} = req.params;
    if(!accommodation) return new ApiError(400, null, "Accommodation is missing.")
    if(!accommodationDetails) return  new ApiError(400, null, "Accommodation Details are important.")
    
    const accommodationBooking = await booking.create({
        name, 
        accommodationDetails,
        accommodation,
        status,
        approvalstatus
    })
    return res.status(200)
        .json(new ApiResponse(200, accommodationBooking, "Booking request is send."))
    
})

const getTravelAgencyBookings = asyncHandler(async(req, res)=>{
    const bookings = await booking.find({ travelAgency: { $ne: null } })
        .populate('name', 'username email') // Populate User details
        .populate('travelAgency', 'name POC_Details travelMode') // Populate TravelAgency details
        .sort({ createdAt: -1 }); // Latest bookings first
    
    if (!bookings || bookings.length === 0) {
        return new ApiError(404, null, "Travel Bookings are not fetched correctly.");
    }
    return res.status(200)
        .json(new ApiResponse(200, bookings, "Travel bookings are fetched successfully."))
    
})

const getAccommodationBookings = asyncHandler(async(req, res)=>{
    const bookings = await booking.find({ accommodation: { $ne: null } })
        .populate('name', 'username email') 
        .populate('accommodation', 'name POC_Details roomTypes')
        .sort({ createdAt: -1 }); 

    if (!bookings || bookings.length === 0) {
        return res.status(404).json({ success: false, message: 'No hotel bookings found' });
    }

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
})

const deleteTravelAgencyBooking = asyncHandler(async(req, res)=>{

})

const deleteAccommodation = asyncHandler(async(req, res)=>{

})
export {
    createATravelAgencyBooking,
    createAccommodationBooking, 
    getAccommodationBookings,
    getTravelAgencyBookings,
    deleteAccommodation,
    deleteTravelAgencyBooking
}