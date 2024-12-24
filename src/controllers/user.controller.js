// we make a asyncHandler to handle user 

import { asyncHandler } from '../utils/asyncHandler.js'

const registerUser = asyncHandler(async(req,res)=>{
     res.status(200).json({
        message : "Ankit's Server"
    })
})

export { registerUser }