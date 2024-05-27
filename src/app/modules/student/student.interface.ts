import { Model, Types } from "mongoose"

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string,
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'AB+' | 'B+' | 'A-' | 'O+';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: boolean;
  isDeleted: boolean;
}


export type TStudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>
}

export type StudentModel = Model<TStudent, Record<string, never>, TStudentMethods>;