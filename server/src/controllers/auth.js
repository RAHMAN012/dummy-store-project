import User from "../models/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"; //used for encrypting password
import crypto from "crypto"; // used to generate random strings
import mailService from "../config/mailService.js"; // used for sending mails
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken.js";
import { uploadImage } from "../config/cloudinary.js";

const cookieOptions = {
  httpOnly: true, //prevents client-side access to the cookie,
  secure: process.env.NODE_ENV === "production", //Https only inproduction
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 60 * 60 * 1000, // cookie is valid for 1hr
  path: "/", //cookie is accessible on all paths
};
export const signUp = async (req, res, next) => {
  const { username, email, password, fullname } = req.body;
  try {
    if (!username || !email || !password || !fullname) {
      return next(createHttpError(400, "All fields are required"));
    }
    //check for existing user
    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ username: username }),
      User.findOne({ email: email }),
    ]);
    if (existingUsername) {
      return next(createHttpError(409, "Username already exists"));
    }
    //  const existingEmail = await User.findOne({email:email})
    if (existingEmail) {
      return next(createHttpError(409, "Email already exists"));
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPAssword = await bcrypt.hash(password, salt);
    //create user
    const user = await User.create({
      username,
      email,
      password: hashedPAssword,
      fullname,
    });
    const verifyToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verifyToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; //24hrs
    //save user to db
    await user.save();
    // send verify email link
    const verifyEmailLink = `${process.env.CLIENT_URL}/account/verify-email/${user._id}/${user.verificationToken}`;
    await mailService({
      from: process.env.EMAIL,
      to: user.email,
      username:user.fullname,
      subject: "Email verification",
      text: `Welcome to Instapics! Click the link below to verify your email: ${verifyEmailLink}. Link expires in 24 hours`,
      btnTExt: "Verify",
      link: verifyEmailLink,
    });
    //  generate tokens
    const accessToken = generateAccessToken(user._id, user.role); //save to local storage
    const refreshToken = generateRefreshToken(user._id, user.role); //save to cookie
    // set refreshToken in http only
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next(createHttpError(400, "Username and password are required"));
    }
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) {
      return next(createHttpError(404, "Account not found"));
    }
    //check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res
      .status(200)
      .json({ success: true, message: "logged in successfully", accessToken });

  } catch (error) {
    next(error)
  }
};

export const authenticateUSer = async(req,res,next)=>{
  const {id:userId} = req.user
  try {
    const user = await User.findById(userId)
    if (!user) {
      // return next(createHttpError(404, "Account not found"))
      return next(createHttpError(401,"Invalid "))
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
export const sendVerifyEmail = async(req,res,next)=>{
  const {id: userId} = req.params
  try {
    const user = await User.findById(userId)
    if(!user){
      return next(createHttpError(404, "Account not found"))
    }
    const verifyToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verifyToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; //24hrs
    //save user to db
    await user.save();
    // send verify email link
    const verifyEmailLink = `${process.env.CLIENT_URL}/account/verify-email/${user._id}/${user.verificationToken}`;
    await mailService({
      from: process.env.EMAIL,
      to: user.email,
      username:user.fullname,
      subject: "Email verification",
      text: `Welcome to Instapics! Click the link below to verify your email: ${verifyEmailLink}. Link expires in 24 hours`,
      btnTExt: "Verify",
      link: verifyEmailLink,
    });
    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async(req,res,next)=>{
  const {userId, verificationToken} =req.params
  try {
    if (!userId || !verificationToken ) {
      return next(400, "user id or verification token is missing")
    }
    const user = await User.findOne({_id:userId, verificationToken:verificationToken}).select("+verificationToken +verificationTokenExpires")
    if (!user) {
      return next(createHttpError(404, "Verification token not found"))
    }
    if (user.verificationTokenExpires< Date.now()) {
      user.verificationToken = undefined
      user.verificationTokenExpires = undefined
      await user.save()
      return next(createHttpError(401,"Verififcation link has expired pls request a new one"))
    }
    user.isVerified =true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined
    await user.save()
    res.status(200).json({success:true , message:"Email verified successfully"})
  } catch (error) {
    next(error)
  }
}
export const logOut  = async (req,res,next)=>{
  try {
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:process.env.NODE_ENV === "production"? "none" : "lax",
      path:"/"
    })
    res.status(200).json({success:true, message:"Logged out successfully"})
  } catch (error) {
    next(error)
  }
}
export const updateUser = async(req,res,next)=>{
  const{id:userId} = req.user
  const{username,email,fullname,profilePicture,bio} = req.body
  try {
    const user = await User.findById(userId)
    if (!user) {
      return next(createHttpError(404, "User not found"))
    }
    if (user._id.toString() !== userId) {
      return next(createHttpError(403, "Unauthorized to perform this request"))      
    }
    // upload image to cloudinary
    let profilePic
    if (profilePicture) {
      try {
        const uploadedPhoto = await uploadImage(profilePicture)
        profilePic = uploadedPhoto
      } catch (error) {
        console.error(error);
        return next(createHttpError(500,"Failed to upload image"))
        
      }
    }
    user.username =username
    user.email =email
    user.bio=bio
    user.fullname =fullname
    user.profilePicture =profilePic
    await user.save()
     res.status(200).json({
      success:true,
      message:"user updated successfully",
      user,
     })

  } catch (error) {
    next(error)
  }
}