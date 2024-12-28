// we make a asyncHandler to handle user 

import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async(req,res)=>{
    // remove pass and refresh token field from response 
    // check for user creation 
    // return response 

    // get user details from frontend 

    const { fullName , username , email , password } = req.body
    console.log('email',email);

      
    // if (fullName === ""){
    //     throw new ApiError(400,'Full Name Is Required')
    // }
    // check one thing continuosly or check everything  

     // validation check it, not empty
    if(
        [fullName , email , username , password ,].some((field)=>
          field?.trim()=== "") 
    ){
        throw new ApiError(400,'All Fields Are Required')
    }

    // check if user alredy exists :: username , email 

    const existedUser =  User.findOne({
        $or: [{ username },{ email }]
    })

    if (existedUser){
        throw new ApiError(409,'user with email or username alredy exists')
    }

    // check for images , check for avatar 
    //req.files is coming from multer

   const avatarLocalPath =  req.files?.avatar[0]?.path;
   const coverImageLocalPath =  req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400 , 'Avatar File Is Required')
   }

    // check them from cloudinary return == url , check avatar

  const avatar =   await uploadOnCloudinary(avatarLocalPath)
  const coverImage =   await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400, 'Avatar File Is Required')
  }

  // create user object -- create entry in db

 const user =  await User.create({
    fullName,
    avatar:avatar.url, // we checked the avatar in it 
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase() 
  })

  const createdUser =   await  User.findById(user._id).select(// mongo db create user._id 
    "-password -refreshToken" // weird syntax
  ) 
  
  if(!createdUser){
    throw new ApiError(500 , "Something went wrong while registering the user")
  }

  // return res

return res.status(201).json(
  new ApiResponse(200, createdUser , "User Registered Successfully")  
)


})

export { registerUser }