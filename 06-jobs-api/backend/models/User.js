const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

const UserSchema= new mongoose.Schema({
name:{
    type: String,
    required: [true, "Please Enter Your Name"],
    minLength: 2,
    maxLength: 20
},
email: {
    type: String,
    required:[true, "Please Enter Valid Email"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,  "Please Enter Valid Email"],
    unique: true
},
password:{
    type: String,
    required: [true, "Please Enter a password"],
    minLength: 6,
},
})

// john said use the 'function' keyword instead of arrow function as it will not work with 'this' keyword.

// hashing the password before saving it to the database.
// in the docs of mongoose you must go to the middlewear section. There you can find the pre method which is used to run a function before saving the data to the database. 
// i think yea neeche waala automatically runs before saving the data to the database.
UserSchema.pre('save', async function(){
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
})

// the .methods is used to create a method on the schema. you can find this in the docs of mongoose under the schema section => instance methods.
// generating token
// we must call the method woh automatically run nahi hota.
UserSchema.methods.createJWT= function(){
    return jwt.sign(
        {userId: this._id, name: this.name}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports= mongoose.model('User', UserSchema)