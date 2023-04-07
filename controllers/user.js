import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new errorHandler("User Already Registered", 400));

    const hashedPass = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    sendCookie(user, res, "Registered Succesfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new errorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, "Logined Succesfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.STAGE === "Development" ? "lax" : "none",
      secure: process.env.STAGE !== "Development",
    })
    .json({
      success: true,
      message: "Logedout Succesfully",
    });
};
