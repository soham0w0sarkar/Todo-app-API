import jwt from "jsonwebtoken";
import Company from "../models/company.js";
import User from "../models/user.js";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
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

export const isEmployee = async (req, res, next) => {
  const { user } = req;
  const { companyId } = req.body;

  const company = await Company.findById(companyId);

  if (!company) {
    return next(new errorHandler("Company not found", 404));
  }

  if (!company.employees.includes(user)) {
    return next(new errorHandler("User is not an employee", 401));
  }
  next();
};
