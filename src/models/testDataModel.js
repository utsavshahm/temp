import mongoose, {Schema, mongo} from "mongoose";

const testData = new Schema({
    testType : {
        type : String, 
        required : true
    },
    testTime : {
        type : Number, 
        required : true, 
    }, 
    accuracy : {
        type : String, 
        required : true, 
    }, 
    wpm : {
        type : String,
        required : true,
    }, 
    date : {
        type : String, 
        required : true
    }

})
const testDataModel = new Schema({
    username : {
        type : Schema.Types.ObjectId,
        ref : "User", 
        required : true
    },
    totalTests : {
        type : Number, 
        required : true,
    },
    testData : {
        type :[testData], 
        required : true
    }
}, {timestamps : true})

export const Test = mongoose.model("Test", testDataModel);