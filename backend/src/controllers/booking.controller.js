import { booking} from "../models/bookings.models.js";
import { TravelAgency } from "../models/travelAgency.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  nodemailer from "nodemailer";
import mongoose from "mongoose";
import { Guest } from "../models/guests.models.js";
import { Accommodation } from "../models/accommodation.models.js";


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
    const { guest, travelDetails, travelApprovalStatus } = req.body;
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
        travelApprovalStatus
    });

    
    const agency = await TravelAgency.findById(travelAgency);
    if (!agency) throw new ApiError(404, "Travel Agency not found.");

    try {
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
                <p><a href="${process.env.ORIGIN}/travelAgencyapproval?bookingId=${travelAgencyBooking._id}">Approve Booking</a></p>
             </div>`
        );

    } catch (error) {
        console.error("Error sending emails:", error);
        throw new ApiError(500, "Failed to send emails.");
    }

    return res.status(200).json(new ApiResponse(200, travelAgencyBooking, "Booking request is sent."));
});


const createAccommodationBooking = asyncHandler(async(req, res)=>{
    const { guest, accommodationDetails, accommodationApprovalStatus } = req.body;
    const { accommodation } = req.params;

    const guestData = await Guest.findById(guest).populate("event");
    if (!guestData || !guestData.event) throw new ApiError(404, "Event not found.");
    const event = guestData.event;

    // Create booking
    const accommodationBooking = await booking.create({
        guest: guestData._id, 
        accommodationDetails,
        accommodation,
        accommodationApprovalStatus
    });

    const agency = await Accommodation.findById();
    if (!agency) throw new ApiError(404, "Accommodation not found.");

    try {
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
                <p><a href="${process.env.ORIGIN}/accommodationapproval?bookingId=${accommodationBooking._id}">Approve Booking</a></p>
             </div>`
        );

    } catch (error) {
        console.error("Error sending emails:", error);
        throw new ApiError(500, "Failed to send emails.");
    }

    return res.status(200).json(new ApiResponse(200, travelAgencyBooking, "Booking request is sent."));
    
})

const getTravelAgencyBookings = asyncHandler(async (req, res, next) => {
    try {
        const bookings = await booking.find({ travelAgency: { $ne: null } })
            .populate('guest', 'name email phoneNumber')  
            .populate('travelAgency', 'name')
            .populate('accommodation', 'name')
            .sort({ createdAt: -1 });

        if (!bookings.length) {
            return res.status(200).json(new ApiResponse(200, [], "No travel bookings found."));
        }

        return res.status(200).json(new ApiResponse(200, bookings, "Travel bookings fetched successfully."));
    } catch (error) {
        return next(new ApiError(500, null, "Internal Server Error"));
    }
});


const travelAgencyApproval = asyncHandler(async (req, res) => {
    const { travelApprovalStatus } = req.body;
    const bookingId = req.query.bookingId;

    // Validate travel agency existence
    const travelAgency = await TravelAgency.findById(travelAgencyId);
    if (!travelAgency) {
        return res.status(400).json(new ApiError(400, [], "Travel Agency not found."));
    }

    // Validate booking existence
    const bookingData = await booking.findById(bookingId);
    if (!bookingData) {
        return res.status(400).json(new ApiError(400, [], "Booking not found."));
    }

    // Update booking with new approval status
    bookingData.travelApprovalStatus = travelApprovalStatus;
    await bookingData.save();

    return res.status(200).json(new ApiResponse(200, bookingData, "Travel agency approval status updated successfully."));
});

const accommodationApproval = asyncHandler(async (req, res) => {
    const { accommodationApprovalStatus } = req.body;
    const bookingId = req.query.bookingId;

    const booking = await booking.findById(bookingId);
    if (!booking) {
        return res.status(400).json(new ApiError(400, [], "Booking not found."));
    }

    booking.accommodationApprovalStatus = accommodationApprovalStatus;
    await booking.save();

    return res.status(200).json(new ApiResponse(200, booking, "Accommodation approval status updated successfully."));
});
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

const getBookingById = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.query;

        if (!bookingId) {
            return next(new ApiError(400, null, "Booking ID is required."));
        }

        const bookingData = await booking.findById(bookingId)
            .populate('guest', 'name email phoneNumber')  
            .populate('travelAgency', 'name')
            .populate('accommodation', 'name');

        if (!bookingData) {
            return next(new ApiError(404, null, "Booking not found."));
        }

        return res.status(200).json(new ApiResponse(200, bookingData, "Booking fetched successfully."));
    } catch (error) {
        return next(new ApiError(500, null, "Internal Server Error"));
    }
});

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
    deleteTravelAgencyBooking,
    travelAgencyApproval,
    accommodationApproval,
    getBookingById,
    
}