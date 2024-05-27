import { z } from "zod";

const userValidationSchema = z.object({
    password: z.string(
        { invalid_type_error: "Name must be a string" }
    ).max(20, { message: "password more than 20 characters" }).optional(),
})

export const UserValidation = {
    userValidationSchema
}