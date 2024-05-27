import { z } from "zod";

// Define Zod schema for UserName subdocument
const UserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
});

// Define Zod schema for Guardian subdocument
const GuardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

// Define Zod schema for LocalGuardian subdocument
const LocalGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
});

// Define Zod schema for Student document
export const StudentValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20),
    name: UserNameValidationSchema,
    gender: z.enum(['male', 'female', 'others']),
    dateOfBirth: z.string(), // Make dateOfBirth required
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'AB+', 'B+', 'A-', 'O+']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    loacalImage: z.string().optional(),
    isActive: z.enum(['active', 'blocked']),
    isDeleted: z.boolean()
});

export default StudentValidationSchema;
