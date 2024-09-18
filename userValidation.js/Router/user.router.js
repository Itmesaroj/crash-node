const express = require("express");
const UserModel = require("../Model/userModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new UserModel(userData);
    await newUser.save();
    res.status(201).json({
      message: "User added successfully",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error adding user"
    });
  }
});

router.get("/", async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json({
        message: "Success",
        data: users
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error fetching users"
      });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "Success",
        data: user
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error fetching user"
      });
    }
  });
  
  router.patch("/update/:id", async (req, res) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error updating user"
      });
    }
  });
  router.delete("/delete/:id", async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User deleted successfully",
        data: deletedUser
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error deleting user"
      });
    }
  });
  
  module.exports = router;
  