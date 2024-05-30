
import config from "../../config"
import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"
import { generateStudentId } from "./user.utils"

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
        throw new Error("Invalid admission semester")
    }

    // set auto generated id
    userData.id = await generateStudentId(admissionSemester)

    // create user 
    const newUser = await UserModel.create(userData)

    // create a user 
    if (Object.keys(newUser).length) {
        //set id,_id as student
        payload.id = newUser.id;
        payload.user = newUser._id; //reference _id

        const newStudent = await Student.create(payload);
        return newStudent;
    }

}
export const UserServices = {
    createStudentIntoToDB

}
