import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation'



const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: 'Students are retrived successfully',
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSinlStudentFromDB(studentId)
        res.status(200).json({
            success: true,
            message: 'Sigle student get successfully',
            data: result,
        })
    } catch (error) {
        next(error)
    }
}
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.deleteStudentFromDB(studentId)
        res.status(200).json({
            success: true,
            message: 'student data deleted successfully',
            data: result,
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
