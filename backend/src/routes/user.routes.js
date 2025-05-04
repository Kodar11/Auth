import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails,
    sendOtp,
    verifyOtp
} from "../controllers/user.controllers.js";

import { validate } from "../middlewares/validate.middlewares.js";
import { 
    loginValidator,
    registerValidator,
    sendOtpValidator,
    verifyOtpValidator

 } from "../validators/auth.validators.js";



import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/register").post(registerValidator,validate,registerUser)
router.route("/login").post(loginValidator,validate,loginUser)
router.route('/login').get(verifyJWT);

//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route('/send-otp').post(sendOtpValidator,validate,sendOtp)
router.route('/verify-otp').post(verifyOtpValidator,validate,verifyOtp)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)



router.route("/protected-route").get(verifyJWT,(req,res)=>{return res.status(200).json();})
export default router