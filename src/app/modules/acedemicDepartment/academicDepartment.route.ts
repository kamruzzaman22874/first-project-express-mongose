import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();


router.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.createAcademicDepartmentsValidationSchema), AcademicDepartmentControllers.createAcademicDepartment);

router.get("/:departmentId", AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch("/:departmentId", validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentsValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);


export const AcademicDepartmentRoutes = router;