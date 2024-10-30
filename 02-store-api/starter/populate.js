const productSchema=require('./models/product')
require('dotenv').config()

console.log("gello")
const products=require('./products.json');
const connectDb=require('./db/connect');

const start=async ()=>{
    try{
        await connectDb(process.env.MONGO_URI);
        await productSchema.deleteMany();
        await productSchema.create(products);
        console.log("sucess!!");
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

start();