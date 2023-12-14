import {Request,Response,NextFunction} from 'express';

// Tạo một custom error class để xử lý các lỗi liên quan đến xác thực

class AuthenticationError extends Error {
    statusCode: number;
    constructor(message:string, statusCode: number=401){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this,AuthenticationError.prototype);

    }
}

//Middleware xử lí lỗi
export const errorHandlerMiddleware = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof AuthenticationError){
        return res.status(err.statusCode).json({message: err.message});

    }

    const statusCode = res.statusCode === 200? 500: res.statusCode;

    res.status(statusCode).json({
        message:err.message || "internal Server Error",
    })
}

// Sử dụng errorHandlerMiddleware trong app.js hoặc index.js của bạn
// app.use(errorHandlerMiddleware);