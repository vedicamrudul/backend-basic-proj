const product = require("../models/product");

productSchema = require("../models/product");

const getAllProducts = async (req, res) => {
    const {featured,name,company, sort, fields, numericFilters}= req.query;
    console.log(req.query);
    // page, limit.

    const queryObject={};
    
    featured && (queryObject.featured=featured==='true'?true:false);
    name && (queryObject.name={$regex:`^${name}`, $options:'i'});
    // ^ is used to search for the name that starts with the name given in the query. The options i is used to make the search case insensitive.
    company && (queryObject.company={$regex:`^${company}`, $options:'i'});


    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ['price', 'rating'];
      filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = {...queryObject[field], [operator]: Number(value) };
        }
      });
    }

    let result=product.find(queryObject);
    // we are not awaiting the result because we are chaining the methods. We are chaining the methods because we are using the queryObject to filter the products. If we await the result, then we will not be able to chain the methods because the result will be an array of products and not a query object. So we are chaining the methods and then awaiting the result at the end.
    // what is a queryObject? It is an object that contains the filters that we want to apply to. 
    if(sort){
        const sortList=sort.split(',').join('');
        result=result.sort(sortList);
    }else{
        result=result.sort('createdAt');
    }

    if(fields){
      const fieldList=fields.split(',').join('');
      result=result.select(fieldList);
    }

    

    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 10;
    const skip=(page-1)*limit;
    
    // basically page is like which page ur on and limit is how many products per page. Lets say you have 100 products and ek page ka limit is 10 products and tum page 3 pe ho which means you will see 20-30 waale products (page 1 will have 1-10, page 2 will have 11-20 and so on). Toh that is page-1*limit. 
    // 3-1=2=> 2*10=20. So 20th product se start hoga tumhara page 3 uptil the limit of 10 products.

    result=result.skip(skip).limit(limit);
    // console.log(result);
    const products=await result;

    res.status(200).json({products, nbHits: products.length});
};


module.exports={
    getAllProducts
    // getAllProductsStatic
}