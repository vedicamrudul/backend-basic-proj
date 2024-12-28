const badRequestError=require('../errors/bad-request')
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  //    1st check for email and password. throw error if empty. If exists create token and send it in the response. so we need jsonwebtokens package here for this.
  const { username, password } = req.body;

  if (!username || !password) {
    throw new badRequestError("please enter valid credentials!");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //  syntax yaad rakho thoda we have jwt.sign and we give three things one is the normal payload thiingy then the secret and expiry/other details.

  res.status(200).json({msg: "user created successfully", token})
};

const dashboard = async (req, res) => {
  // idhar we must check for authorization cuz only people with token can access the dashboard. But yea kaam authorization middlewear karta hai humesha. ok so yaha idhar iska itna hi kaam hai. but ha like authorize hua toh req.body mai we will add username which will come from the jwt token data we sent during login ig.

  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `Hello ${req.user.username}`,
      secret: `Here is your authorized data. Your lucky number is ${luckyNumber}`,
    });
};

module.exports = {
  login,
  dashboard,
};
