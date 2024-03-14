const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 4000;

//middleware
app.use(
  cors({
    exposedHeaders: ["Content-Length", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());

const db = process.env.MONGO_URI || "mongodb://localhost:27017/nityo";

// Listen to app port then connect to DB with try catch
app.listen(PORT, () => {
  try {
    mongoose.connect(db, {});
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/users", userRoutes);

// Add 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Add error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
