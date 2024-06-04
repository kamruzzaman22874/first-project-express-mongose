
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
// import studentValidationSchema from './student.validation'

const getStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Student retrieve successfully',
        data: result
    })
}
)
const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params
    const result = await StudentServices.getSinlStudentFromDB(studentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Student retrieve successfully',
        data: result
    })
})

const updateStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params
    const { student } = req.body;
    const result = await StudentServices.updateStudentIntoDB(studentId, student)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student updated successfully',
        data: result
    })
})
const deleteStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student deleted successfully',
        data: result
    })
})


export const StudentsController = {
    getStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
}
