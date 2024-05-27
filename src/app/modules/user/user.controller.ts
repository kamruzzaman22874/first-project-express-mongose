
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // creating a schema validation using zod

        const { password, student: studentData } = req.body;

        // data validation using zod 
        // const zodparseData = StudentValidationSchema.parse(studentData)

        const result = await UserServices.createStudentIntoToDB(password, studentData)
        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        })
    } catch (err) {
        next(err)
    }

}
export const UserController = {
    createStudent
}
