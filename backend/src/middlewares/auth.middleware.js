import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Extracted token:", token);  // Debugging line

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded token:", decodedToken);  // Debugging line

        // Find user from database
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            console.log(`User not found with ID: ${decodedToken?._id}`);
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user to the request object
        req.user = {
            id: user.id,
            role: user.role
        };
        
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("JWT Verification Error:", error);  // Logs the full error
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
