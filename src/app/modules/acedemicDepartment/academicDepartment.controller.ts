import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
    const { department } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(department)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department is created successfully",
        data: result
    })
})

const getAllAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic Department is retrieved successfully",
        data: result
    })
})
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic Department is retrieved successfully",
        data: result
    })
})
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.updateAcademicDepartmentFromDB(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Academic Department is retrieved successfully",
        data: result
    })
})



export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}