import { Student } from './student.model'


const createStudentsFromDB = async () => {
  const result = await Student.create();
  return result;
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
}
const getSinlStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    { $match: { id: id } }
  ])
  return result;
}
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSinlStudentFromDB,
  createStudentsFromDB,
  deleteStudentFromDB
}
