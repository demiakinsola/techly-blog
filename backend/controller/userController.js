const User = require("../model/User");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!req.body || !fullName || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  const foundUser = await User.findOne({ email });
  //check if user exists
  if (foundUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    return res.status(409).json(savedUser);
  } catch (err) {
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  const foundUser = await User.findOne({ email });
  //if the user isn't found
  if (!foundUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  //check if the passwords match
  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (matchPassword) {
    return res.status(200).json(foundUser);
  }
};

//delete user account
const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  const foundUser = await User.findOne({ email });
  //check if the user exists
  if (!foundUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchPassword) {
    return res.status(404).json({ message: "Wrong password" });
  }
  const deleted = await foundUser.deleteOne();
  res.json(deleted);
};

module.exports = { newUser, userLogin, deleteUser };
