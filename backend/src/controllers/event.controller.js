import  jwt from "jsonwebtoken";
import { Event } from "../models/events.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  nodemailer from "nodemailer"
import { EventManager } from "../models/eventManager.models.js";

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
    const clientsArray = Array.isArray(client) ? client : [client];
const clientEmails = clientsArray?.map(async(c)=>{
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

const getEventList = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) throw new ApiError(401, null, "Access Token is missing.");

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!payload) {
            return res.status(401).json(new ApiResponse(401, null, "Invalid Token"));
        }

        const userId = payload._id;
        const events = await Event.find({ createdBy: userId });

        if (!events.length) {
            return res.status(200).json(new ApiResponse(200, [], "No Events."));
        }

        return res.status(200).json(new ApiResponse(200, events, "Events retrieved successfully."));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error, "Something went wrong while fetching the events."));
    }
});

const deleteList = asyncHandler(async(req, res) =>{
    
})

export {createAnEvent, getEventList};