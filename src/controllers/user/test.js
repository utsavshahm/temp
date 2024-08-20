import { User } from "../../models/userModel.js";
import { Test } from "../../models/testDataModel.js";
const createEntry = async (req, res) => {
  const { user } = req; 
  const {testData } = req.body;


  // console.log("======================",testData)

  if (!user) return res.status(406).json("Unauthorised Access!");

  const validUser = await User.findOne({ username: user.username });

  if (!validUser) return res.status(404).json("User doesn't exist!");

  try {
    let testEntry = await Test.findOne({ userId: validUser._id });

    if (testEntry) {
      // console.log(testEntry);
      testEntry.testData.push(testData);
      // console.log("hyyyyyy ", testEntry.testData)
      let updateTestData = await Test.findOneAndUpdate({ userId: validUser._id }, { testData: testEntry.testData })
      testEntry = updateTestData; 
    } else {
      testEntry = await Test.create({
        userId: validUser._id,
        testData: testData,
      });
    }
    // console.log(testEntry);

    return res
      .status(200)
      .json({
        success: "ok",
        msg: "Test Entry created Successfully!",
        test: testEntry,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json("Server Error! Unable to create Test Entry to DB");
  }
};

export { createEntry };
