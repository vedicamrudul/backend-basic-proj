require('dotenv').config();
require('express-async-errors');

// extra security packages
const cors=require('cors');
const helmet= require('helmet');
const xss=require('xss-clean');
const ratelimiter=require('rate-limiter');


const authenticator=require("./middleware/authentication")
const express = require('express');
const app = express();
// connectDB
const connectDB = require('./db/connect');

// routes
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.set('trust proxy', 1); //this is to use ratelimiter ig with a proxy like horuku where we are gonna host 
app.use(ratelimiter({
  windowMs: 15*60*1000, //15 minutes
  max: 100, //limit each IP too 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet());
// Helmet is a collection of middleware functions that help secure Express.js applications by setting various HTTP headers. It helps protect your app from some well-known web vulnerabilities by setting appropriate HTTP headers.
app.use(cors());
app.use(xss());
// xss-clean is a middleware that sanitizes user input coming from POST body, GET queries, and URL parameters to prevent XSS (Cross-Site Scripting) attacks. It helps to clean the input data to remove any malicious scripts.

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authenticator, jobsRouter);

app.get('/', (req, res) => {
  res.send('jobs api');
});

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
