const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,

    // so the issue i was having was all of these were deprecated
  })
}

module.exports = connectDB






// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
//     socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = run;
