const express = require('express');
const dotenv = require('dotenv');
const app = express();
const dbConnection = require('./dbConnection/dbConnection.js');
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require('./routes/fileupload.js');

dotenv.config();
dbConnection();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Error while starting the server!");
    }else{
        console.log(`Server is listening at port number:${process.env.PORT}`)
    }
})
