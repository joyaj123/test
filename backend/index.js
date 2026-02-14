const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Sector = require("./models/Sectors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Node.js is running");
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

/*
    const sector = new Sector({
      code: "TECH",
      name: "Technology",
      description: "Online digital businesses"
    });

    await sector.save();
    console.log("Sector created");
*/
//test pour cree et ajouter une collection

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log("Error:", err);
  }
}

startServer();
