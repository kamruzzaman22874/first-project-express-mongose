
import { ErrorRequestHandler } from "express"
import config from "../config";
import { handleZodError } from "../errors/handleZodError";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //settings default values 
    let statusCode = err.statusCode | 500;
    let message = err.message || "something went wrong"

    let errorSources: TErrorSource = [{
        path: "",
        message: "Something went wrong"
    }];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === "development" ? err?.stack : null
    })
    next()
}

export default globalErrorHandler