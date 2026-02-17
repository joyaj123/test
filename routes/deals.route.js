// routes/deals.route.js
const express = require("express");
const router = express.Router();
const Deal = require("../models/Deals"); 



router.post("/", async (req, res) => {
  try {
    console.log("Creating deal with data:", req.body);
    const deal = await Deal.create(req.body);
    res.status(201).json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(400).json({ message: error.message });
  }
});



router.get("/", async (req, res) => {
  try {
    console.log("Fetching all deals...");
    const deals = await Deal.find({});
    console.log(`Found ${deals.length} deals`);
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json(deal);
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ message: error.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(400).json({ message: error.message });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
