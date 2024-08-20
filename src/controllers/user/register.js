import { User } from "../../models/userModel.js";

export const registerUser = async (req, res) => {
  const { username, password, cnfPassword } = req.body;
  console.log(username, password, cnfPassword);

  if (!username || !password || !cnfPassword) {
    return res.status(400).json({success : false, msg : "Please fill all details!"});
  }

  const existingUsername = await User.findOne({ username: username });
  
  if (existingUsername) {
    return res.status(406).json({success : false, msg : "Username already taken!"});
  }

  try {
    const createUser = await User.create({
      username: username,
      password: password,
    });

    console.log(createUser);

    const getUser = await User.findById(createUser._id).select("-password");

    if (!getUser)
      return res.status(404).json({success : false , msg : "Internal Server Error! Please try again!"});
    
    return res.status(200).json({ success : true, msg: "Registered Successfully! Please Login.", user: getUser });
  } catch (error) {
    console.log("ERROR OCCURED : ", error);
  }
};
