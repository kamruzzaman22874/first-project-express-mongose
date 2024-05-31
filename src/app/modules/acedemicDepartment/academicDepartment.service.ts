import { AcademiFacultyModel } from "../academicFaculty/academicFaculty.model"
import { TAcademicDepartment } from "./academicDepartment.interface"

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademiFacultyModel.create(payload);
    return result;
}

const getAllAcademicDepartmentFromDB = async () => {
    const result = await AcademiFacultyModel.find();
    return result;
}
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademiFacultyModel.findById(id);
    return result;
}

const updateAcademicDepartmentFromDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>
) => {
    const result = await AcademiFacultyModel.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
}



export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB
}