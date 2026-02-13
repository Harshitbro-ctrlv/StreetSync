import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body.address)
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
    address,
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

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  //  Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // ave refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Cookie options
 const cookieOptions = {
  httpOnly: true,
  secure: true,        // MUST be true in production
  sameSite: "none",    // REQUIRED for cross-site cookies
};
  const updateUser = await User.findById(user._id).select("-password")

  // 7️⃣ Send cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options
    })
    .cookie("refreshToken", refreshToken, {
      ...options
    })
    .json({
      success: true,
      message: "User logged in successfully",
      updateUser
    });
});

export const searchForVendors = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;

  if (!loggedInUser) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (!loggedInUser.address?.city) {
    throw new ApiError(400, "User location not available");
  }

  const city = loggedInUser.address.city;

  const vendors = await User.find({
    role: "vendor",
    "address.city": { $regex: new RegExp(`^${city}$`, "i") },
    _id: { $ne: loggedInUser._id },
  }).select("-password -refreshToken -__v");

  return res.status(200).json({
    success: true,
    count: vendors.length,
    vendors,
  });
});
