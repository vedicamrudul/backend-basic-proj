const unauthorizedError=require('./unauthorised')
const badRequestError=require('./bad-request')
const CustomAPIError=require('./custom-error')

module.exports={
    unauthorizedError,
    badRequestError,
    CustomAPIError
}