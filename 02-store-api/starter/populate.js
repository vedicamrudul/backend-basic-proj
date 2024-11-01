const productSchema=require('./models/product')
require('dotenv').config()

// in terminal just run node populate

console.log("hello")
const products=require('./products.json');
const connectDb=require('./db/connect');

const start=async ()=>{
    try{
        await connectDb(process.env.MONGO_URI);
        await productSchema.deleteMany();
        await productSchema.create(products);
        console.log("sucess!!");
        process.exit(0)
        // process.exit is used to exit the process and 0 means that the process was successful.
    }catch(err){
        console.log(err)
        process.exit(1);
        // 1 means that the process was not successful.
    }
}

start();