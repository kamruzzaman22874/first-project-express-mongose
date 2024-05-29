import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const academicSemesterIntoDB = async (payload: TAcademicSemester) => {
    const result = await AcademicSemesterModel.create(payload)
    return result;
}

export const AcademicSemesterServices = { academicSemesterIntoDB }