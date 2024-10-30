const express=require('express');
const connectDB = require('./db/connect');
require('dotenv').config();
const taskRoutes=require("./routes/tasks");
const notFound=require("./middlewear/notFound");
const errorHandlerMiddleware=require("./middlewear/errorHandlerMiddelwear");
const app=express();
const cors = require('cors');

const port= process.env.PORT || 3000;
// before running the server, we can set the port in the console by using the command:  PORT=8000 nodemon app => instead of 8000 ofc you can essentially put wtv you want. 

app.use(cors());
// middleware
app.use(express.json())
// app.use(express.static('./public'))

// routes
app.use('/api/v1/tasks', taskRoutes)

app.use(notFound);
// this notFound middlewear is used when no route is found. It basically sends a 404 error. 
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
