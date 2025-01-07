const mongoose=require('mongoose');

const JobSchema=new mongoose.Schema({
    company:{
        type: String,
        required: [true,"Please provide company Name "],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Please provide position name"],
        maxlength: 100
    },
    status:{
        type: String,
        enum: ["interview", " Declined", "Pending"],
        default: "pending"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"]
    }
},{timestamps: true})

module.exports= mongoose.model('Job', JobSchema)