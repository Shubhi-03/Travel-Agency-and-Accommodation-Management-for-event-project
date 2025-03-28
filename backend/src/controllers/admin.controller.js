import { Accommodation } from "../models/accommodation.models.js";
import { EventManager } from "../models/eventManager.models.js";
import { Event } from "../models/events.models.js";
import { TravelAgency } from "../models/travelAgency.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Client } from "../models/client.models.js";

const getTravelAgency = asyncHandler(async(req, res) =>{
    const agencies = await TravelAgency.find(); 
    if (agencies.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No travel agencies found."));
    }

    return res.status(200).json(new ApiResponse(200, agencies, "Travel agencies fetched successfully."));
})

const getAccommodationList = asyncHandler(async(req, res) =>{
    const agencies = await Accommodation.find(); 
    if (agencies.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No Accommodations found."));
    }

    return res.status(200).json(new ApiResponse(200, agencies, "Accommodations fetched successfully."));
})
const getEventManagerList = asyncHandler(async (req, res) => {
    const eventManagers = await User.find({ role: "EventManager" });

    if (!eventManagers.length) {
        throw new ApiError(404, "No Event Managers found");
    }

    res.status(200).json(new ApiResponse(200, eventManagers, "Event Managers retrieved successfully"));
});


const getEvents = asyncHandler(async(req, res) => {
    const events = await Event.find();
    if(!events.length){
        return res
        .status(200)
        .json(new ApiResponse(200, [], "No Events present."))
    }
    return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully."))
})
const removeEvent = asyncHandler(async (req, res) => {
    const eventId = req.query.eventId; 

    if (!eventId) {
        throw new ApiError(400, "Event ID is required.");
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    
    if (!deletedEvent) {
        throw new ApiError(404, "Event not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, deletedEvent, "Event is deleted.")
    );
});


const removeEventManager = asyncHandler(async(req, res) => {
    const eventManagerId = req.query.eventManagerId; 

    const deletedEventManager = await User.findByIdAndDelete(eventManagerId);
    if(!deletedEventManager){
        throw new ApiError(404, "Event Manager not Found.");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, deletedEventManager, "Event Manager is deleted."))
})

const removeClient = asyncHandler(async(req, res)=>{
    const clientId = req.query.clientId; 

    const deletedclient = await Client.findByIdAndDelete(clientId);
    if(!deletedclient){
        throw new ApiError(404, "Client not Found.");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, deletedclient, "Client is deleted."))
})

const addTravelAgency = asyncHandler(async (req, res) => {
    const { name, pointOfContact, services } = req.body;

    if (!name || !pointOfContact || !services) {
        throw new ApiError(400, {}, "All fields are required.");
    }

    try {
        const newTravelAgency = await TravelAgency.create({
            name,
            pointOfContact,
            services
        });

        return res
            .status(201)
            .json(new ApiResponse(201, newTravelAgency, "Travel Agency added successfully."));
    } catch (error) {
        throw new ApiError(500, {}, "Failed to add Travel Agency.");
    }
});


const removeTravelAgency = asyncHandler(async(req, res) => {
    const travelAgencyId = req.query.travelAgencyId;
    const deletedTravelAgency = await TravelAgency.findByIdAndDelete(travelAgencyId);
    if(!deletedTravelAgency){
        throw new ApiError(404, "Travel Agency not Found.");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, deletedTravelAgency, "Travel Agency is deleted."))
})

const addAccommodation = asyncHandler(async(req, res) => {
    const {name, address, pointOfContact, amenities} = req.body;
    if(!name || !pointOfContact || !amenities){
        throw new ApiError(400, {}, "All the fields are required.")
    }

    const newAccommodation = await Accommodation.create({
        name : name,
        address : address,
        pointOfContact : pointOfContact,
        amenities : amenities
    })

    if(!newAccommodation){
        throw new ApiError(400, [], "Something went wrong.")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, newAccommodation, "Accommodation is added."))
})

const removeAccommodation = asyncHandler(async(req, res) => {
    const accommodationId = req.query.accommodationId;
    const deletedAccommodation = await Accommodation.findByIdAndDelete(accommodationId);
    if(!deletedAccommodation){
        throw new ApiError(404, "Accommodation not Found.");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, deletedAccommodation, "Accommodation is deleted."))
})

export {
    removeAccommodation,
    removeEvent,
    removeEventManager, 
    removeTravelAgency,
    removeClient,
    addAccommodation,
    addTravelAgency,
    getEventManagerList,
    getTravelAgency,
    getAccommodationList,
    getEvents
}