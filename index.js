const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;
require("dotenv").config();

// This is the url of your React application.
// It is stored in your .env file so it can be different between
// your local and online applications
const REACT_URL = process.env.REACT_URL;

// This initializes your Express application
const app = express();

// This puts the restriction on your server.
// "origin" restricts the place from where people can use your server
// (here we limit to your local app, or from the url 'https://mymemo-client.vercel.app/')
app.use(
  cors({
    origin: REACT_URL,
    methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"],
  })
);

// This is for "translating" the incoming JSON data
// that comes from your frontend app, so Express / Nodejs can understand it (it is called "parsing data")
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api/v1", require("./src/v1/routes"));

app.listen(PORT, () => {
  console.log("local server is running");
});

module.exports = app;
