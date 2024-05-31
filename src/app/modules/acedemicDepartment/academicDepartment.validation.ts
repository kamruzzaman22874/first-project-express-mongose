import { z } from "zod";



const createAcademicDepartmentsValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be string",
            required_error: "Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic Department must be string",
            required_error: "Faculty is required"
        })

    })
})
const updateAcademicDepartmentsValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must be string"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic Department must be string",
            required_error: "Faculty is required"
        }).optional()

    })
})


export const AcademicDepartmentValidation = {
    createAcademicDepartmentsValidationSchema,
    updateAcademicDepartmentsValidationSchema
}