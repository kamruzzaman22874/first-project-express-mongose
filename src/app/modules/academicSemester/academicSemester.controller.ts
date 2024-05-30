
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    // const { password, student: studentData } = req.body;
    const result = await AcademicSemesterServices.academicSemesterIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is created successfully",
        data: result
    })
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is created successfully",
        data: result
    })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is created successfully",
        data: result
    })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
        semesterId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is retrieved succesfully',
        data: result,
    });
});


export const AcademicSemesterControllers = {
    createAcademicSemester,
    getSingleAcademicSemester,
    getAllAcademicSemesters,
    updateAcademicSemester
}