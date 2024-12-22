import mongoose , {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    username : {
        type : String,
        required : true , 
        unique : true , 
        lowercase : true ,
        trim : true ,
        index : true 
    },
    email : {
        type : String,
        required : true , 
        unique : true , 
        lowercase : true ,
        trim : true ,
    },
    fullName : {
        type : String,
        required : true , 
        index : true ,
        trim : true ,
    },
    avatar : {
        type : String, // cloudinary url
        required : true , 
    },
    coverImage : {
        type : String,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String , // encrypt it 
        required : [true, 'password is required']
    },
    refreshToken : {
        type : String 
    }

},{timestamps : true })

// direct encryption of any pass is not possible so we use pre hook mongoose
// we cannot pass direct callback because we need context but in callbacks it dont have ,
// using async because it can take some time to encrypt
// we are using next because we want to flag some data

userSchema.pre("save", async function(next) {
    // when we send pass then encrypt it if wont 
    if(!this.isModified("password")) return next()
        
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// designing custom methods provided by mongoose 

userSchema.methods.isPasswordCorrect = async function(password){
  return await  bcrypt.compare(password , this.password)
}

// jwt == bearer token like its a key

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
        {
            _id:this._id,
            email : this.email,
            username:this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email : this.email,
            username:this.username,
            fullName : this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}



export const User = mongoose.model("User",userSchema)