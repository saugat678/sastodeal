import mongoose from "mongoose"
import colors from 'colors'


const connectDB = async() =>{
    try{
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/Sastodealdb');
        
        if (connection) {
            console.log("connnectd to mongodb ".bgCyan.white)
          }
} catch (error){
        console.log(`Error in mongodb ${error}`.bgRed.white);
    }
}
export default connectDB;