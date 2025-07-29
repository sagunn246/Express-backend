const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  contactNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  deliveryDescription: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
    unique: true,
  },
});

userschema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

userschema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error("error");
  }
};

const User = mongoose.model("user", userschema);
module.exports = User;
