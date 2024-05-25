import { Schema, model } from 'mongoose'
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TStudentMethods, TUserName } from './student.interface'
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "First Name can not be allow more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capatilized format"
    }
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid"
    }
  },
})
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"]
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is required"],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local occupation name is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local contactNo name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
})

const studentSchema = new Schema<TStudent, StudentModel, TStudentMethods>({
  id: {
    type: String,
    required: true, unique: true
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"]

  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: "{VALUE} is not a valid gender",
    },
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'AB+', 'B+', 'A-', 'O+'],
      messages: "The blood group field can only be one of the following :'A+', 'AB+', 'B+', 'A-', 'O+' "
    },
    required: true
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian is required"]
  },
  loacalImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active"

  },
})

// const User = model<IUser>('User', userSchema);

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
