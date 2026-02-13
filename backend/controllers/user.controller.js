import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = "user", stallName } = req.body;

  // 1️Basic validation
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  // 2️⃣ Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }
  let address;
  let parsedMenu;

  try {
    address = JSON.parse(req.body.address);
  } catch {
    throw new ApiError(400, "Invalid address format");
  }

  // 3️⃣ Vendor-specific validation
  if (role === "vendor") {
    if (!stallName) {
      throw new ApiError(400, "Vendor must provide stall name");
    }

    if (!address.country || !address.state || !address.city) {
      throw new ApiError(400, "Vendor must provide country, state and city");
    }

    try {
      parsedMenu = JSON.parse(req.body.menu);
    } catch {
      throw new ApiError(400, "Invalid menu format");
    }
  }

  // 5️⃣ Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    stallName: role === "vendor" ? stallName : undefined,
    address: role === "vendor" ? address : undefined,
    menu: role === "vendor" ? parsedMenu : [],
  });

  // 6️⃣ Remove password from response
  const createdUser = await User.findById(user._id).select("-password");

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: createdUser,
  });
});
