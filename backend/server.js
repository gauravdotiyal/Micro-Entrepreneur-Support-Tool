const express= require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes= require('./routes/auth.routes')
const app=express();

app.use(express.json());

// Mongo DB connection
connectDB();

// routes 
app.use('/api/auth',authRoutes);


const PORT=process.env.port || 3000; 

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})


