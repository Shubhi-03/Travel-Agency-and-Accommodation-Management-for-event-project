import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}
    }catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async(req, res) => {
const {name, email, phoneNumber, password, role } = req.body;
if(
    [name, email, phoneNumber, password, role].some((field)=>field?.trim() === "")
)
    {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if(existedUser){
        throw new ApiError(409, "User already registered.")
    }
    const user = await User.create({
        name : name,
        email : email,
        phoneNumber : phoneNumber,
        role : role,
        password : password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering.")
    }
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully.")
    )
}
)

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    if(!(email)) {
        throw new ApiError (400, "email is required")
    }

    const user = await User.findOne({email}) 

    if(!user){
        throw new ApiError(404, "User does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError (401, "Password not correct")
    } 

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true, // Set to true for security in production
    maxAge: 1000 * 60 * 60 * 24,
        secure:false,
        sameSite: "Strict"
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
})


const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res 
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!refreshAccessToken){
        throw new ApiError(401, "unauthorized request")
    }
        try{
            const decodedToken = jwt.verify(incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )

            const user = await User.findById(decodedToken?._id)

            if(!user){
                throw new ApiError(401, "Invalid refresh Token")
            }

            if(incomingRefreshToken != user?.refreshToken){
                throw new ApiError(401, "Refresh token is expired or used")
            }

            const options = {
                httpOnly: true,
                secure: true
            }

            const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access token refreshed"
                )
            )


        }catch(error){
                throw new ApiError(401, error?.message || "Invalid refersh Token " )
        }
    
})

export { registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
 };