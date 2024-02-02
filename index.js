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

app.listen(PORT, () => {
  console.log("local server is running");
});

module.exports = app;
