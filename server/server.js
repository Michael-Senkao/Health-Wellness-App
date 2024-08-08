import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

//dot env config
dotenv.config();

//databases connection
connectDB ();

//rest object
const app = express();

//middleware 
app.use(morgan('dev')); //gives realtime access time as a middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes 
//routes import 
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/userRoutes.js';
app.use('/api/v1/',testRoutes);
app.use('/api/v1/user',userRoutes);

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to KDP node hellyeah server</h1>")
})


//port, if port no in .env file is not accessible, it takes the other port number
const PORT = process.env.PORT || 8000; 


//listen 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV} mode`);
})