const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require('./models/Users');            // not Users
const Deal = require('./models/Deals');           // capital D, plural ok
const Distribution = require("./models/Distribution"); 
const Country = require("./models/Countries");    // capital C, plural ok

// Routers
const usersRoute = require("./routes/users.route");
const dealsRoute = require("./routes/deals.route");
const distributionsRoute = require("./routes/distributions.route");
const countriesRoute = require("./routes/countries.route");



/* FOR DEBBUGING EZA 3EZTA BA3DEN 
let User, Deal;
try {
  console.log('✅ User model loaded successfully');
} catch (error) {
  console.error('❌ Error loading User model:', error.message);
}*/


const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies , request with Content-Type: application/json
app.use(express.urlencoded({ extended: false })); //IMPORTANT MIDDLEWAR , ALLOWS EXPRESS TO READ DATA SEND FROM FORMS , request with Content-Type: application/x-www-form-urlencoded


//routes
app.use("/users", usersRoute);
app.use("/deals", dealsRoute);
app.use("/distributions", distributionsRoute);
app.use("/countries", countriesRoute);



// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    console.log("📊 Database:", mongoose.connection.name);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:");
    console.error("   Error:", err.message);
    console.error("   Make sure MongoDB is running!");
  });

// Root route
app.get("/", (req, res) => {
  res.json({  //this send back a json request 
    message: "API is working",
    endpoints: {
      users: "/users",
      deals: "/deals"
    }
  });

  //or res.send("API IS WORKING") ; 
});

// 404 handler for undefined routes
app.use((req, res) => { //run every incoming request 
  res.status(404).json({ message: `Route ${req.path} not found` });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Test endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/users`);
  console.log(`   GET  http://localhost:${PORT}/deals`);
});