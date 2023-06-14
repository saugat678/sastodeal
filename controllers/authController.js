
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
export const registerController = async( req,res)=>{
    
    try{
const {name,email,password,phone,address, question}=req.body;
// validation
if(!name){
    return res.send({message:'Name is required'});
}
if(!email){
    return res.send({message:'email is required'});
}
if(!password){
    return res.send({message:'password is required'});
}
if(!phone){
    return res.send({message:'phone number is required'});
}
if(!address){
    return res.send({message:'address is required'});
}
if(!question){
    return res.send({message:'question is required'});
}

const exisitingUser =await userModel.findOne({email});
// exisiting user
if(exisitingUser){
   return res.status(200).send({
    success: false,
    message : 'Already Regiter please login',
   }) 
}
// register user
const hashedPassword = await hashPassword(password)
// save
const user= await new userModel({name, email,phone,address,question,  password :hashedPassword}).save();
res.status(200).send({
    success: true,
    message:'user register successfully',
    user,
}) ;
}catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in Registeration',
            error,
        });
    }
};
// POST login
export const loginController =async (req, res)=>{
    try{
        const {email,password} =req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success: true,
                message: "invalid email or password",
            })
        }
        const  user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "email is not register",
            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: "invalid password",
            })
        }
const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.status(200).send({
    success: true,
    message: "login successfully",
    user:{
        name : user.name,
        email : user.email,
        phone : user.phone,
        address : user.address,
        role : user.role,
    },
    token,

})  
} catch(error){
        console.log(error)
        res.status(500).send({
            success:  false,
            message:"error in login",
            error,
        })
    }
};
// forgotpasswordcontroller
export const forgotPasswordController= async(req,res)=>{
try {
    const{email,question,newPassword}=req.body;
    if(!email){
        res.status(400).send({message: 'Email is require'});
    }
    if(!question){
        res.status(400).send({message: 'question is require'});
    }
    if(!newPassword){
        res.status(400).send({message: 'newPassword is require'});
    }
    //check
    const user = await userModel.findOne({email, question});
    if (!user){
        return res.status(404).send({
            success :false,
            message:"wrong email or question",
        });
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
        success: true,
        message: "password reset successfull",
    });
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message : 'something went worng',
        error
    });
    
}
};
// test controller
export const testController = (req,res)=>{
   try {
res.send("protected Route");
   }catch (error){
    console.log(error);
    res.send({error});
   }
};
// update profile
export const updateProfileController = async(req,res)=>{
    try {
        const {email,name,password,address,phone}=req.body;
        const user =await userModel.findById(req.user._id);
        // password
        if (password && password.length<6){
            return res.json({error :'password is required and 6 character'});
        };
        const hashedPassword = password ? await hashPassword(password):undefined;
        const updateUser =await userModel.findByIdAndUpdate(req.user._id,{
name:name||user.name,
password :hashedPassword||user.password,
phone :phone ||user.phone,
address:address||user.address,
        },{new:true});
res.status(200).send({
    success: true,
    message: 'profile updated successfully',
    updateUser
});
    } catch (error) {
        console.log(error);
       res.status(500).send({
        success: true,
        error,
        message : "Error while not updated profile ",
       });
        
    }
};
// orders

export const getOrderController = async(req,res) =>{
    try {
        const orders = await OrderModel.find({buyer:req.user._id})
        .populate("products","-photo").populate("buyer","name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message : "Error while order not found"
        });
        
    }
};

// all order
export const  getAllOrderController = async(req,res) =>{
    try {
        const orders = await OrderModel.find({})
        .populate("products","-photo")
        .populate("buyer","name")
        .sort({createAt : "-1"});
        res.json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message : "Error while allorder not found",
            error,
           });
        
    }
};
// orderstatuscontroller
export const orderStatusController =async (req , res) =>{
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const orders =await OrderModel
        .findByIdAndUpdate(orderId,{status},{new:true});
        res.json(orders);
        } catch (error) {
        console.log(error);
        res.status(400).send({
            success : false,
            message :"Error while orderStatuscontroller",
            error,
        });

        
    }
};
