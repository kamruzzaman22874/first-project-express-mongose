import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body
  const result = await StudentServices.createStudentToDB(studentData)
  // send response
  res.status(200).json({
    success: true,
    message: 'Student created successfully',
    data: result,
  })
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
    console.log(error)
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
