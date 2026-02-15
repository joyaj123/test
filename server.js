const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/Users') 
require("dotenv").config();

const app = express();
app.use(express.json()); //middlewar VERY IMPORTANT to be able to send json files


//EXPRESS READ ROUTES BEL DOR MEN FO2 LA TAHET  

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



//TO POST A USER 
app.post('/users', async (req, res) => {  
  try {
    const user = await User.create(req.body);
    res.status(201).json(user); 
  }
  catch(error) {
    res.status(500).json({ message: error.message });  // 500 = Server Error
  }
});

//GET all users 
app.get('/users' , async (req,res) => {
  try{
    const users = await User.find({}) ; 
    res.status(200).json(users) ; 
  }
  catch(error){
    res.status(500).json({ message: error.message });  // 500 = Server Error
  }

}) ; 


//READ user by his ID 
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);//params.id get the id from URL 
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
});


//UPDATE a user (kmn based on his id) 
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,     // ID of user to update
      req.body,          // Data to update
      { 
        new: true,       // Return the updated user
        runValidators: true  // Run schema validation
      }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  }
  catch(error) {
    res.status(400).json({ message: error.message });
  }
});


// 5. DELETE a user (DELETE)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
});




app.get("/", (req, res) => { //route handler in express 
  res.send("API is working"); //req is what the user send , res is what the server send 
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
});