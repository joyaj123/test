const express = require("express");
const router = express.Router() ;
const User = require('../models/Users');

router.get('/' , async (req,res) =>{
     try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch(error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: error.message });
      }
})


router.get('/:id' , async (req,res) =>{
     try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
      } catch(error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: error.message });
      }
})

router.post('/' , async (req,res)=>{
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
      } catch(error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: error.message });
      }
})

router.put('/:id' , async(req,res) =>{
    try {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { 
            new: true,
            runValidators: true
          }
        );
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
      } catch(error) {
        console.error('Error updating user:', error);
        res.status(400).json({ message: error.message });
      }
})


router.delete('/:id' , async(req,res) =>{
     try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
      } catch(error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: error.message });
      }
})

module.exports = router;
