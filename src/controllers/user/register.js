import { User } from "../../models/userModel.js";

export const registerUser = async (req, res) => {
  const { username, email, password, cnfPassword } = req.body;
  console.log(username, email, password, cnfPassword);

  if (!username || !email || !password || !cnfPassword) {
    return res.status(400).json("Please fill all details!");
  }

  const duplicateUsername = await User.findOne({ username: username });

  if (duplicateUsername) {
    return res.status(406).json("Username already taken!");
  }

  const duplicateEmail = await User.findOne({ email: email });

  if (duplicateEmail) {
    return res.status(406).json("Email already exist!");
  }

  if (password != cnfPassword) {
    return res.status(406).json("Passwords don't match!");
  }

  try {
    const createUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    console.log(createUser);

    const getUser = await User.findById(createUser._id).select("-password");

    if (!getUser)
      res.status(404).json("Internal Server Error! Please try again!");
    return res.status(200).json({ msg: "ok", user: getUser });
  } catch (error) {
    console.log("ERROR OCCURED : ", error);
  }
};
