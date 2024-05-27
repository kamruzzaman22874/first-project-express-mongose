import express from 'express'
import { StudentsController } from './student.controller'

const router = express.Router()

// will call controller fucntion
router.get('/', StudentsController.getStudents)
router.get('/:studentId', StudentsController.getSingleStudent)
router.delete('/:studentId', StudentsController.deleteStudent)

export const StudentRoutes = router
