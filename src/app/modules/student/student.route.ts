import express from 'express'
import { StudentsController } from './student.controller'

const router = express.Router()

// will call controller fucntion

router.post('/create-student', StudentsController.createStudent)
router.get('/', StudentsController.getStudents)
router.get('/:studentId', StudentsController.getSingleStudent)

export const StudentRoutes = router
