import {Router} from "express"
import {signUp,signIn, authenticateUSer, sendVerifyEmail, verifyEmail, logOut, updateUser} from "../controllers/auth.js"
import { verifyAuth,Roles } from "../middlewares/verifyAuth.js"


const router = Router()
router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/sendVerifyMail/:id", sendVerifyEmail)
router.post("/logout", logOut)
// get
router.get("/user",verifyAuth(Roles.All),authenticateUSer)

router.patch("/verifyMail/:userId/:verificationToken",verifyEmail)

router.patch("/updateuser",verifyAuth(Roles.All),updateUser)

export default router 
