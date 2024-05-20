export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}
export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type Student = {
  id: string
  name: UserName
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'AB+' | 'B+' | 'A-' | 'O+'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  loacalImage?: string
  isActive: 'active' | 'blocked'
}
