const express = require("express");
const router = express.Router();
const UserModel = require("../Model/userModel");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to retrieve users" });
  }
});

// Add a new user
router.post("/add", async (req, res) => {
  try {
    const reqbody = req.body;
    console.log(reqbody);
    
    const user = new UserModel(reqbody);
    await user.save();
    
    res.status(201).json({ message: "User successfully added to the database" });
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to add user" });
  }
});

// Update user by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;  
    const reqbody = req.body;  
  
    const user = await UserModel.findByIdAndUpdate(id, reqbody, { new: true });
  
    if (!user) {
      return res.status(404).json({ msg: "User not found, the update did not happen" });
    }
  
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to update user" });
  }
});


router.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const user=await UserModel.findByIdAndDelete(id)
        if(!user){
            res.status(404).send("user not found")

        }
        res.status(200).send("user delete successfully")
    }catch(err){
        res.status(500).json({ error: err.message || err, msg: "Failed to delete user" });
    }
})
module.exports = router;
