import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: false,
    })
    .json({
      success: true,
      message: message,
    });
};

export const isAuthenciated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "PLease Login",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};
