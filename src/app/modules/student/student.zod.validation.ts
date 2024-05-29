import { z } from "zod";

// Define Zod schema for UserName subdocument
const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
});

// Define Zod schema for Guardian subdocument
const guardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

// Define Zod schema for LocalGuardian subdocument
const localGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
});

// Define Zod schema for Student document
export const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female', 'others']),
            dateOfBirth: z.date().optional(), // Make dateOfBirth required
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum(['A+', 'AB+', 'B+', 'A-', 'O+']),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            loacalImage: z.string().optional(),
        })
    })
});

export const StudentValidations = {
    createStudentValidationSchema
};
