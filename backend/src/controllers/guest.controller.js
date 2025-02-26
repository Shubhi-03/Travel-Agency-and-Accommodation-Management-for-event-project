import { Event } from "../models/events.models.js";
import { Guest } from "../models/guests.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

const getEventEmails = async (eventId) => {
    try {
        const event = await Event.findById(eventId).populate("createdBy", "email");

        if (!event) {
            throw new ApiError(404, null, "Event not found.");
        }

        const clientEmails = event.client.map(client => client.email).filter(email => email); // Remove any null values

        const eventManagerEmail = event.createdBy?.email; 

        const allEmails = eventManagerEmail ? [eventManagerEmail, ...clientEmails] : [...clientEmails];

        return allEmails;
    } catch (error) {
        console.error("Error fetching event emails:", error);
        throw new ApiError(500, null, "Failed to retrieve event emails.");
    }
};

const guestFormSubmit = asyncHandler( async(req, res, next)=>{
    const {departure_date, departure_time, location, accommodation_days, modeOfTravel, comment} = req.body;
    const {guestId} = req.query;
    const {eventId} = req.query;
    if(!guestId) throw new ApiError(400, null, "Guest Id is necessary.")
    if(!eventId) throw new ApiError(400, null, "Event Id is necessary.")
    
    if(!departure_date || !departure_time || !location || !accommodation_days || !modeOfTravel){
        throw new ApiError(400, null, "All fields are necessary.")
    }
    const guest = await Guest.findOne({"_id":guestId});
    if(!guest) throw new ApiError(400, null, "Guest don't exist.")
    guest.departure_date = departure_date ;
    guest.departure_time = departure_time ;
    guest.location = location ;
    guest.accommodation_days = accommodation_days ;
    guest.modeOfTravel = modeOfTravel;
    guest.comment = comment;
    guest.formStatus = true;
    await guest.save();
    const event = await Event.findById(eventId);
    if(!event) throw new ApiError(400, null, "Event is missing.")
    const emailIds = await getEventEmails(eventId);
    console.log(emailIds);
    const Emails = emailIds?.map((email) => {
        if (!email) {
            console.warn("Client does not have an email address.");
            return Promise.resolve();
        }
        console.log(`Sending email to: ${email}`);
        return sendMail(  
            email, 
            `Guest update for Event: ${event.name}`,
            `Greetings,\nEvent "${guest.name}" has submitted the details for event ${event.name}.\nLogin to view more details.`,
            `<div>
                <h1>Greetings,</h1>
                <p>Guest ${guest.name} has submitted the details for event ${event.name}.</p>
                <p>Login to view more details.</p>
                <p><a href="http://localhost:3001/login">Login</a></p>
             </div>`
        );   
    });
    await Promise.all(Emails);  
    
    return res
    .status(200)
    .json(new ApiResponse(200, guest, "Guest details updated successfully."));

})

export {guestFormSubmit}