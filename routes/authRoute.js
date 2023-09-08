import express from 'express' 
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getBookingsController, getAllBookingsController,  bookingStatusController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
//router object

const router = express.Router();

//routing
//REGISTER || METHOD POST

router.post('/register', registerController);

//LOGIN || POST

router.post("/login", loginController);

// forget password || post

router.post('/forgot-password', forgotPasswordController);




//test routes
router.get('/test', requireSignIn, isAdmin, testController);

 //protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
   res.status(200).send({ok: true});
});

 //protected admin route auth
 router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
   res.status(200).send({ok: true});
});

//updateb profile
router.put('/profile', requireSignIn, updateProfileController);

//bookings
router.get('/bookings', requireSignIn, getBookingsController);

//all bookings
router.get('/all-bookings', requireSignIn, isAdmin, getAllBookingsController);

//booking status update
router.put('/booking-status/:bookingId', requireSignIn,isAdmin, bookingStatusController);
export default router;