const User=require('../models/User')
const {BadRequestError, UnauthenticatedError}=require('../errors')
const {StatusCodes}=require('http-status-codes')



const register=async (req,res)=>{
    // const {name, email, password}=req.body
    // if(!name || !email || !password){
    //     throw new BadRequestError("Please enter name, email and password.")
    // }
    // so these three lines of code, we dont actually need it joh upar hai as mongoose performs all these validations on its own. But kabhi kabhi lag sakta hai apna custom waala.

    // below is more code that we dont need as we have shifted the logic to the model user using mongodb middlewear but for reference i am keeping it here. 

    // // hashing the password.
    // const {password}=req.body
    // const salt= await bcrypt.genSalt(10)
    // const hashedPassword= await bcrypt.hash(password, salt)
    // const user= await User.create({...req.body, password: hashedPassword})

    // // now also to generate token.
    // const token=jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "30d"})

    // res.status(StatusCodes.CREATED).json({user:{userId: user._id, name: user.name}, token})

    // yea sab upar ka code is moved to the model user using mongoose middlewear.

    const user= await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({user:{userId: user._id, name: user.name}, token: user.createJWT()})
}


const login=async (req,res)=>{
    // login mai kya hoga? email password dega aadmi, usko muje verify karna hai. agar verify hogaya toh token bhejna hai. token frontend pe jayega aur phir har request mai hum token se verify karenge ki user hai and then access denge. yea token verification handle hoga authentication ke middlewear mei. 
    // so primarily yaha joh kaam karna hai that is verifying email and password and then sending back a token if verified and throwing an error if not.


    const {email,password}= req.body
    if(!email || !password) throw new BadRequestError("Please enter email and password")

    const user=await User.findOne({email: email})
    if(!user) throw new UnauthenticatedError("Invalid Email, user not found")
    
    const isCorrectPassword= await user.comparePassword(password);
    if(!isCorrectPassword) throw new  UnauthenticatedError("Incorrect Password")

        res.status(StatusCodes.OK).json({user:{userId: user._id, name: user.name}, token: user.createJWT()})
}


module.exports={
    login,
    register
}