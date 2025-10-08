const express= require('express');
require('dotenv').config();

const app=express();

app.use(express.json());

// Mongo DB connection


const PORT=3000;

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})


