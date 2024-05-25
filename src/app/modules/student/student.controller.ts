import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation'
import StudentValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
    try {
        // creating a schema validation using zod


        const { student: studentData } = req.body

        // data validatin using joi 



        // data validation using zod 
        const zodparseData = StudentValidationSchema.parse(studentData)
        const result = await StudentServices.createStudentToDB(zodparseData)
        console.log(result)


        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'something went wrong',
        //         error,
        //     })
        // }

        // send response
        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        })
    }

}

const getStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: 'Students are retrived successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        })
    }
}

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params
        const result = await StudentServices.getSinlStudentFromDB(studentId)
        res.status(200).json({
            success: true,
            message: 'Sigle student get successfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
    }
}

export const StudentsController = {
    createStudent,
    getStudents,
    getSingleStudent,
}
