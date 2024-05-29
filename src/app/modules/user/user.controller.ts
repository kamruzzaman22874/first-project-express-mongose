
import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent: RequestHandler = async (req, res, next) => {
    try {
        // creating a schema validation using zod

        const { password, student: studentData } = req.body;

        // data validation using zod 
        // const zodparseData = StudentValidationSchema.parse(studentData)

        const result = await UserServices.createStudentIntoToDB(password, studentData)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }

}
export const UserController = {
    createStudent
}
