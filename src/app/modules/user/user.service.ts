
import config from "../../config"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"

const createStudentIntoToDB = async (password: string, studentData: TStudent) => {
    // create a user object 
    const userData: Partial<TUser> = {}

    //if password is not given, use default password
    userData.password = password || config.default_password as string;
    // set a strudent role 
    userData.role = "student";
    // set manually generated id

    userData.id = "2030100001"



    // create user 
    const newUser = await UserModel.create(userData)

    // create a user 
    if (Object.keys(newUser).length) {
        //set id,_id as student
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference _id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }

}
export const UserServices = {
    createStudentIntoToDB

}
