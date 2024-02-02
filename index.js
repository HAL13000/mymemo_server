const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001;
require("dotenv").config();
const REACT_URL = process.env.REACT_URL;

const app = express();

app.options("*", cors());

app.use(cors());

// {
//   origin: REACT_URL,
//   methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"],
//   credentials: true,
// }

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, UPDATE"
  );
  next();
});

app.use("/api/v1", require("./src/v1/routes"));

// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("db connected");
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("local server is running");
});

module.exports = app;
