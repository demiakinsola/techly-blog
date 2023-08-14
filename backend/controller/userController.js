const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    return res.status(200).json(savedUser);
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
    //generate the accessToken
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        userDetails: {
          email: foundUser.email,
          roles: roles
        } 
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d'}
    );
    //generate the refreshToken
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '2d'}
    );

    //save the refreshToken in the database
    foundUser.refreshToken = refreshToken;
    const savedUser = await foundUser.save();
      
    //save the refreshToken in a httpOnly cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 48 * 60 * 60 * 1000
      })
      //return the accessToken
      return res.json({ roles, accessToken })
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
