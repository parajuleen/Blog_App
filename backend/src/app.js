const express=require('express')
const app=express()
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json()); //For JSON payloads,//
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userrouter= require('./routes/user.route')
const blogrouter=require('./routes/blog.route')

app.use('/api/user',userrouter)
app.use('/api/blog',blogrouter)


module.exports={
    app
}