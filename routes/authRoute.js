import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


// Create the router
const router = express.Router();

// Register - POST
router.post('/register', registerController);

// Login - POST
router.post('/login', loginController);

// Forgot Password - POST
router.post('/forgot-password', forgotPasswordController);

// Test route - GET
router.get('/test', requireSignIn , isAdmin , testController);

// User Authentication  rout- GET
router.get('/user-auth', requireSignIn , (req, res) => {
  res.status(200).send({ ok: true });
});
// admin route
router.get('/admin-auth', requireSignIn ,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// update profile
router.put('/profile',requireSignIn,updateProfileController);
// orders
router.get('/orders', requireSignIn,getOrderController);
// all order
router.get('/all-orders', requireSignIn,getAllOrderController);
// order Status update 
router.put("/order-status/:orderId",requireSignIn , isAdmin,orderStatusController);

export default router;
