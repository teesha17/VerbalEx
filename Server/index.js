const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const dbConnection = require('./dbConnection/dbConnection.js');
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require('./routes/vehicleRoute.js')

//comment 
//comment2
//comment3
//comment4

dotenv.config();
dbConnection();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api",vehicleRoutes);

app.listen(process.env.PORT||5000, (err) => {
    if (err) {
        console.log("Error while starting the server!");
    } else {
        console.log(`Server is listening at port number: ${process.env.PORT}`);
    }
});

