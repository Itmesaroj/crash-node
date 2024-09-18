const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters"],
    match: [/^[a-zA-Z\s]+$/, "Name should only contain alphabets and spaces"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number must be exactly 10 digits"],
    maxlength: [10, "Phone number must be exactly 10 digits"],
    match: [/^\d{10}$/, "Phone number should contain only digits"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"],
    max: [65, "Age must be less than or equal to 65"],
    validate: {
      validator: Number.isInteger,
      message: "Age must be a whole number"
    }
  }
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
