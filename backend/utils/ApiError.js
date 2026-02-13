class ApiError extends Error{
    constructor(code,message){
        super(message)
        this.message = message
        this.code = code
    }
}

export {ApiError}