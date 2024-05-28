import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
// import studentValidationSchema from './student.validation'



const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSinlStudentFromDB(studentId)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.deleteStudentFromDB(studentId)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const StudentsController = {
    getStudents,
    getSingleStudent,
    deleteStudent
}
