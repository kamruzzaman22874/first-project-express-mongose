import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty"
    }
},
    {
        timestamps: true
    })





academicDepartmentSchema.pre("save", async function (next) {
    const isDepartmentExists = await AcademicDepartmentModel.findOne({
        name: this.name
    })
    if (isDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Department already exists!")
    }
    next();
})

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
    if (!isDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This Department does not exists!")
    }
    next();
})

export const AcademicDepartmentModel = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)