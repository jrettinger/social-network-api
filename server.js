const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
const PORT = 3001;

//ENVIRONMENT VARIABLE/CONSTANTS
env.config();

//MONGODB CONNECTION
require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
