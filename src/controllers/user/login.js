import { User } from "../../models/userModel.js";
import { generateAccessRefreshTokens } from "../auth/generateToken.js";

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
     console.log(req.body)
  if (!username || !password)
    return res.status(406).json("Please fill all the fields!");

  const validUser = await User.findOne({ username: username });
    console.log(validUser)
  if (!validUser) return res.status(406).json("Username doesn't exit!");

  const validatePwd = await validUser.isPasswordCorrect(password);
  if (!validatePwd) return res.status(400).json("Incorrect Password!");

  // as everything is fine, we generate a access token and allow user to login
  const { accessToken, refreshToken } = generateAccessRefreshTokens(validUser);

  validUser.refreshToken = refreshToken;
 
  const loggedInUser = await User.findById(validUser._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json({
    success: "True",
    msg: "Logged In Successfully!",
    credentials: loggedInUser,
    token: accessToken,
  });
};
