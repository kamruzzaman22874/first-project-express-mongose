import { Schema, model } from 'mongoose'
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface'



const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "First Name can not be allow more than 20 characters"],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
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

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "ID is required"],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User is required"],
    unique: true,
    ref: "User"
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
    type: Date,
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
  profileImage: {
    type: String,
  },

  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment"
  }
},
  {
    toJSON: {
      virtuals: true
    }
  })

// virtual
studentSchema.virtual("fullName").get(function () {
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})


// Query middleware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDelted: { $ne: true } } })
  next();
})
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})

// studentSchema.virtual("fullName", get(function () {
//   return this.name.firstName + this.name.middleName + this.name.lastName
// }))

// const User = model<IUser>('User', userSchema);
studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser
}
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
