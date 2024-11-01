const product = require("../models/product");

productSchema = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products= await product.find({})
  res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res) => {
    const {featured,name,company}= req.query;

    const queryObject={};
    
    featured && (queryObject.featured=featured==='true'?true:false);
    name && (queryObject.name={$regex:`^${name}`, $options:'i'});
    // ^ is used to search for the name that starts with the name given in the query. The options i is used to make the search case insensitive.
    company && (queryObject.company={$regex:`^${company}`, $options:'i'});

    const products= await product.find(queryObject);
    res.status(200).json({products, nbHits: products.length});
};


module.exports={
    getAllProducts,
    getAllProductsStatic
}