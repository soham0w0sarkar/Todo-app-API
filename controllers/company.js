import Company from "../models/company.js";
import errorHandler from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, companyId } = req.body;

    if (!name || !companyId) {
      next(new errorHandler("Please provide name and CompanyId", 400));
    }

    const company = await Company.create({
      name,
      companyId,
    });

    res.status(201).json({
      success: true,
      message: "Company Registered Successfully",
    });
  } catch (error) {
    next(new errorHandler(error.message, 500));
  }
};
