// * node js not providing class for response but we are using express, so we are building our own class (in future) 

class ApiResponse {
    constructor (statusCode , data , message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        // server code always less than 400
        this.success = statusCode < 400 
    }

}