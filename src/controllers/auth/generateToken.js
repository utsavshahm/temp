import { User } from "../../models/userModel.js";

export const generateAccessRefreshTokens = (user) => {
  const findUser = User.findById(user._id);
  // console.log(findUser);
  if (!findUser) {
    return;
  }
  const refreshToken = findUser.generateRefreshToken;
  const accessToken = findUser.generateAccessToken;
  findUser.refreshToken = refreshToken;
  findUser.validateBeforeSave = false;

  return { accessToken, refreshToken };
};
