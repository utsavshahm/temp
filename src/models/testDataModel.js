import mongoose, {Schema} from "mongoose";

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
        type : Number, 
        required : true, 
    }, 
    wpm : {
        type : Number,
        required : true,
    }, 
    date : {
        type : Date, 
        required : true
    }

})
const testDataModel = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User", 
        required : true
    },
    testData : {
        type :[testData], 
        required : true
    }
}, {timestamps : true})

export const Test = mongoose.model("Test", testDataModel);