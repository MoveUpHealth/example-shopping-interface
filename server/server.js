/*
Author: Christina Lee
Date: Aug 12, 2021

File Description: Main file for the server.

*/

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

//use mongoose to connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection attempt successful");
})

//added by JT on August 30th 2021
//route for signup
require("./routes/authRoutes")(app);

//listen on the server
app.listen(port, () => {
    console.log("Server is running on port " + port);
});

