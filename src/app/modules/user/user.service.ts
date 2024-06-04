
import httpStatus from "http-status"
import config from "../../config"
import { AppError } from "../../errors/AppError"
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"
import { generateStudentId } from "./user.utils"
import mongoose from "mongoose"

const createStudentIntoToDB = async (password: string, payload: TStudent) => {
    // create a user object 
    const userData: Partial<TUser> = {}
    //if password is not given, use default password
    userData.password = password || config.default_password as string;
    // set a strudent role 
    userData.role = "student";

    //year semesterCode 4 digit number
    // find academic semester info 
    const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid admission semester")
    }

    const session = await mongoose.startSession()
    try {
        session.startTransaction();
        // set auto generated id
        userData.id = await generateStudentId(admissionSemester)
        // create a user (taransaction-1)
        const newUser = await UserModel.create([userData], { session }) //array
        // create a user 
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
        }
        //set id,_id as student
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a student (taransaction-2)
        const newStudent = await Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
        }

        await session.commitTransaction();
        await session.endSession();
        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }

}
export const UserServices = {
    createStudentIntoToDB

}
