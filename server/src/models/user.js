import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true, //no duplicates of username in db
    required: [true, "username is required"],
    trim: true,
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "password must be at least 6 characters"],
    select: false, // prevents this field from being sent
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // enum are like predefined values that should only be accepted
    default: "user",
  },
  token: {
    type: String,
    select: false,
  },
  tokenExpires: {
    type: Date,
    select: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpires: {
    type: Date,
    select: false,
  },
  lastLogin:{
    type:Date,
    default:Date.now,
  },
  profilePicture:{
    type:String,
  },
  profilePhotoId:{
   type:String,
  },
  bio:{
    type:String,
    maxLength:[150, "bio cannot be more than 150 characters"]
  },
  followers:{
    type:[String],    
  },
  following:{
    type:[String],
  },
  isPublic:{
    type:Boolean,
    default:true
  },
  savedPost:{
    type:[Schema.Types.ObjectId],
    ref:"Post",
    default:[],
    select:false
  }
},

{
    timestamps:true //adds createdAt an updatedAt fields to the doc
}
);

const User = model("User", userSchema)

export default User