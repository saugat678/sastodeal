import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
import categoryRoute from "./routes/CategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
     import Path  from "path";

improt {fileURL ToPath} from "url";



// configure . env
dotenv.config();

// rest object
const app = express();
// database
connectDB();
const_filename = fileURLToPath (import.meta.url);
cost_dirname = path.dirname(_filename);
// middelwares
app.use(cors());
app.use (express.json());
app.use(morgan('dev'));
 app.use(express.static(Path.join(__dirname,'./client/build')));
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product", ProductRoute);

app.get("/",(req,res)=>{
    res.sendfile(path.join(_dirname,"./client/build/index.html"));
});


// POrt
const PORT = process.env.PORT || 8080;
// run listen
app.listen(PORT,()=>{
    console.log(`Server Runnig on ${PORT}`.bgCyan.white);
});
