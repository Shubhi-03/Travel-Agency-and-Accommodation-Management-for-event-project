import { Event } from "../models/events.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    secure : true,
    host : "smtp.gmail.com",
    port : 465,
    auth : {
        user : process.env.EMAIL_SERVICE_ID,
        pass : process.env.EMAIL_SERVICE_PASSWORD
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
        console.log("Email sent",info)
    }catch(error){
        throw new ApiError(500, (error.message));
    }
}
const createAnEvent = asyncHandler(async(req, res) => {
const {name, description, startDate, endDate, budget, client, venue} = req.body;
if(!name) throw new ApiError(400, "Event name is required.");
if(!startDate) throw new ApiError(400, "Start Date is required.");
if(!endDate) throw new ApiError(400, "End Date is required.");
if(!venue) throw new ApiError(400, "Venue is required.");
const eventCreated = await Event.create({
    name:name,
    description:description,
    startDate:startDate,
    endDate:endDate,
    budget:budget,
    client:client,
    venue:venue,
    createdBy:req.user.id
})
if(!eventCreated) throw new ApiError(400, "Something went wrong while creating an event.")
const clientEmails = await client.map(async(c)=>{
    if (!c.email) {
        console.warn(`Client ${c.name || "unknown"} does not have an email address.`);
        return;
    }
 await sendMail(
    c.email, 
        `Event Scheduled: ${name}`,
        `Greetings,\nEvent "${name}" is scheduled on ${startDate}.\nLogin to view more details.`,
        `<div>
            <h1>Greetings,</h1>
            <p>Event "<b>${name}</b>" is scheduled on <b>${startDate}</b>.</p>
            <p>Login to view more details.</p>
         </div>`
    
)   
})
await Promise.all(clientEmails);
return res
.status(200)
.json(
    new ApiResponse(
        200,
        {eventCreated},
        "Event created Successfully"
    )
)
}) 

export {createAnEvent};