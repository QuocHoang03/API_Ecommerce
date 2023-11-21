const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

// Create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create a new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   Check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      email: findUser.email,
      mobile: findUser.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user
const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getOneUser = await User.findById(id);
    res.json(getOneUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createUser, loginUserCtrl, getAllUser, getOneUser };
