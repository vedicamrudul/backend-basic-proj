const product = require("../models/product");

productSchema = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const queries=req.query;
//   const products = await productSchema.find({featured:true}).sort("name");
const products=await productSchema.find(queries)
  res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

module.exports={
    getAllProducts,
    getAllProductsStatic
}