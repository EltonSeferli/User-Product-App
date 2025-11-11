const asyncHandler = require("express-async-handler");
const User = require("../models/userMode");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { signToken } = require("../utils/token");
dotenv.config();
const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const userIsExist = await User.findOne({ where: { email } });
  if (userIsExist)
    return res
      .status(400)
      .json({ param: "email", message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashed_password,
  });

  const token = signToken({ id: user.id, email: user.email });
  return res.status(201).json({
    message: "User registered",
    user: { id: user.id, email: user.email, name: user.username },
  });
});
