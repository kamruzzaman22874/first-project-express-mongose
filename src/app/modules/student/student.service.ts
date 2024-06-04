import mongoose from 'mongoose';
import { Student } from './student.model'
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';


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
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      }
    });
  return result;
}
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  // const result = await Student.findOne({ id });

  const { name, guardian, localGuardian, ...remainnigStudentData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainnigStudentData,
  }
  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${keys}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${keys}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${keys}`] = value
    }
  }


  console.log(modifiedUpdateData)

  const result = await Student.findOneAndUpdate(
    { id },
    modifiedUpdateData,
    { new: true, runValidators: true }
  )
  return result;
}
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {

    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student")
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
    }

    await session.commitTransaction();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, " Failed to delete student")
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSinlStudentFromDB,
  createStudentsFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB
}
