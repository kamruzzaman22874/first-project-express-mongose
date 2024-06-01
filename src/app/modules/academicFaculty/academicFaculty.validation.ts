import { z } from "zod";

const createAcademicFaultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Faculty Must be string"
        }),
    }),
});
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Faculty Must be string"
        })
    })
})

export const AcademicFacultyValidation = {
    createAcademicFaultyValidationSchema,
    updateAcademicFacultyValidationSchema
}