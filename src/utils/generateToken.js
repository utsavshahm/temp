import { User } from "../models/userModel.js";

export const generateAccessRefreshTokens = async (user) => {
  const findUser = await User.findById(user._id);
  // console.log("hello", findUser);
  if (!findUser) {
    return;
  }
  const refreshToken = await findUser.generateRefreshToken();
  // console.log("refresh ", refreshToken);
  const accessToken = await findUser.generateAccessToken();
  // console.log("access ", accessToken)
  findUser.refreshToken = refreshToken;
  findUser.validateBeforeSave = false;

  return { accessToken, refreshToken };
};
