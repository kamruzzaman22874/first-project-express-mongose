import express from 'express'
import { StudentsController } from './student.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { updateStudentValidationSchema } from './student.zod.validation'

const router = express.Router()

// will call controller fucntion
router.get('/', StudentsController.getStudents)
router.get('/:studentId', StudentsController.getSingleStudent)
router.patch('/:studentId', validateRequest(updateStudentValidationSchema), StudentsController.updateStudent)
router.delete('/:studentId', StudentsController.deleteStudent)

export const StudentRoutes = router
