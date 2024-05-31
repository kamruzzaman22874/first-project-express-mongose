import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademiFacultyModel } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademiFacultyModel.create(payload);
    return result;
}

const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademiFacultyModel.find();
    return result;
}

const singleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademiFacultyModel.findById(id);
    return result;
}

const updateAcademicFacultyFromDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademiFacultyModel.findOneAndUpdate({ _id: id, }, payload, { new: true });
    return result;
}


export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    singleAcademicFacultyFromDB,
    updateAcademicFacultyFromDB
}