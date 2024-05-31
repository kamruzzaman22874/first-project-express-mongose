import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";


const academicSemesterIntoDB = async (payload: TAcademicSemester) => {

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code")
    }

    const result = await AcademicSemesterModel.create(payload)
    return result;
}

const getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemesterModel.find();
    return result;
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemesterModel.findById(id);
    return result;
}

const updateAcademicSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid Semester code !")
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result;
}

export const AcademicSemesterServices = {
    academicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}