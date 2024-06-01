import { Student } from './student.model'


const createStudentsFromDB = async () => {
  const result = await Student.create();
  return result;
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      }
    });
  return result;
}
const getSinlStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      }
    });
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
