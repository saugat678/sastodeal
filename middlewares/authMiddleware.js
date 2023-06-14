import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = (req, res, next) => {
    // Middleware implementation
  
  
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
// isadmin
export const  isAdmin = async (req,res,next) =>{
  try {
     const user = await userModel.findById(req.user._id);
     if(user.role!==1){
      return res.status(401).send({
          success :false,
          message :"unAuthorized accesss",
      })
     } else{
      next();
     }
  } catch (error) {
     console.log(error);
     res.status(401).send({
      success: false,
      error,
      message:'Error in admin middelware',
     });
  }
};


