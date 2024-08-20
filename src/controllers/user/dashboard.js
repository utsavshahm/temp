import { User } from "../../models/userModel.js";
import { Test } from "../../models/testDataModel.js";

const dashboard = async (req, res) => {
  const { user } = req;
  if (!user) return res.status(406).json("Invalid user!");

  try {
    const validUser = await User.findById(user._id, {
      createdAt: true,
      email: true,
    });

    if (!validUser) return res.status(404).json({success : false, msg : "User not found!"});

    // Initialize details object
    let details = {
      createdAt: validUser.createdAt,
      username: user.username,
      maxWPM: 0,
      avgWPM: 0,
      totalTests: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      wpmTypes: { 15: 0, 30: 0, 60: 0, 120: 0 },
      accTypes: { 15: 0, 30: 0, 60: 0, 120: 0 },
      allTests: [],
    };

    
    const testEntry = await Test.findOne({ userId: validUser._id });

    if (!testEntry) return res.status(200).json({ testData: details });

    // console.log("testEntries ", testEntry.testData);

    // Sort testData array in descending order by date
    testEntry.testData.sort((a, b) => b.date - a.date);

    details.totalTests = testEntry.testData.length;
    details.allTests = testEntry.testData;

    let totalWPM = 0,
      totalAccuracy = 0;
    

    // stats required
    testEntry.testData.forEach((test) => {
      details.maxWPM = Math.max(test.wpm, details.maxWPM);
      details.maxAccuracy = Math.max(test.accuracy, details.maxAccuracy);

      if (details.wpmTypes[test.testTime] !== undefined) {
        details.wpmTypes[test.testTime] = Math.max(
          test.wpm,
          details.wpmTypes[test.testTime]
        );
        details.accTypes[test.testTime] = Math.max(
          test.accuracy,
          details.accTypes[test.testTime]
        );
      }

      totalWPM += test.wpm;
      totalAccuracy += test.accuracy;
    });

    details.avgWPM = (totalWPM / details.totalTests).toFixed(2);
    details.avgAccuracy = (totalAccuracy / details.totalTests).toFixed(2);

    return res.status(200).json({ success : true, testData: details });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export { dashboard };
