import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser

dotenv.config();
import {mongoConnection} from './db/mongoconection.js';
const app = express();
app.use(bodyParser.json({ limit: '500mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}
app.use(cors(corsOptions));
app.use(express.json());
mongoConnection();
import router from './Routes/Routes.js';
app.use(router)
app.listen(process.env.PORT,()=>{
    console.log("the server is running...")

})

