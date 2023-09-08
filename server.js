import express from 'express';
import  colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import ServiceRoutes from './routes/ServiceRoutes.js';
import cors from "cors";
import path from 'path';
import { fileURLToPath} from 'url';
//config env
dotenv.config();

//database config 
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest object

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/service', ServiceRoutes);


//rest api
app.use('/',function(req,res){
    // res.sendFile(path.join(__dirname,'./client/build/index.html'));
    res.send("<h1> Welcome</h1>")
});

//port 
const PORT = process.env.PORT || 8080 ;

app.listen(PORT, () => {
    console.log('server is running on  ${process.env.DEV_MODE}  mode on   {PORT}'.bgCyan.white);
}); 
