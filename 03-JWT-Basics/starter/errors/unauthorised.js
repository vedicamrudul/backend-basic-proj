const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class unauthorizedError extends CustomAPIError{
    constructor(messgae){
        super(message)
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}

module.exports= unauthorizedError;