const jwt = require("jsonwebtoken");
const unauthorizedError=require('../errors/unauthorised')

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unauthorizedError(
      "bro pls thoda niklo aap nai dekh sakte yea sab"
    );
  }

  const token = authHeader.split(" ")[1];
  console.log(token)

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode)
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new unauthorizedError("nikla ikdum chala phatkan");
  }
};

module.exports= authenticationMiddleware