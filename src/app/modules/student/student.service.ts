import { Student } from './student.model'
import { TStudent } from './student.interface'

const createStudentToDB = async (studentData: TStudent) => {
  //const result = await StudentModel.create(student) // built in static method

  const student = new Student(studentData) // create an instance

  if (await student.isUserExists(studentData.id)) {
    throw new Error("User alredy exists")
    // student.isUserExists()
  }
  const result = await student.save() // built in instance method
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}
const getSinlStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getSinlStudentFromDB,
}
