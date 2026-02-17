// routes/countries.route.js
const express = require("express");
const router = express.Router();
const Country = require("../models/Countries");

//  GET ALL COUNTRIES 
router.get("/", async (req, res) => {
  try {
    const countries = await Country.find({});
    res.status(200).json(countries);
  } catch (error) {
    console.error("ERROR FETCHING COUNTRIES:", error);
    res.status(500).json({ message: error.message });
  }
});

//  CREATE A COUNTRY 
router.post("/", async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    console.error("ERROR CREATING COUNTRY:", error);
    res.status(400).json({ message: error.message });
  }
});

//  GET COUNTRY BY ID 
router.get("/:id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json(country);
  } catch (error) {
    console.error("ERROR FETCHING COUNTRY:", error);
    res.status(500).json({ message: error.message });
  }
});

//  UPDATE A COUNTRY 
router.put("/:id", async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error("ERROR UPDATING COUNTRY:", error);
    res.status(400).json({ message: error.message });
  }
});

//  DELETE A COUNTRY 
router.delete("/:id", async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("ERROR DELETING COUNTRY:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
