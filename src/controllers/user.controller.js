import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";

//step0: get user details from frontend
//step 1: validate the user details- not empty, valid email, valid password, valid username, valid full name, valid avatar, valid cover image
//step 2: check if user already exist (both username and email)
//step 3: check if file is present or not (avatar and cover image)
//step 4: upload the file on cloudinary
//step 5: CLoudinary returnd url of the image (validate the url with cloudinary and multer)
//step 6: create user object and save in the database
//step 7: remove the password and refresh token from the response
//step 8: check for user creation
//step 9: return the response

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, fullName, avatar, coverImage, password} = req.body;
    console.log(username, email, fullName, avatar, coverImage, password);

    if(!username || !email || !fullName || !password){
        throw new apiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({$or: [{username}, {email}]});
    if(existingUser){
        throw new apiError(409,"User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage[0].path;

    if(!avatarLocalPath || !coverImageLocalPath){
        throw new apiError(400, "Avatar and cover image are required");
    }

    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
    const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatarUrl || !coverImageUrl){
        throw new apiError(400, "Failed to upload image on cloudinary");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        fullName,
        avatar: avatarUrl.url,
        coverImage: coverImageUrl.url,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new apiError(500, "Failed to create user");
    }

    res.status(201).json(new apiResponse(200, createdUser, "User created successfully"));

})


export {registerUser};












