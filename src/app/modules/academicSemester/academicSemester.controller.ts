
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

export const AcademicSemesterControllers = {
    createAcademicSemester
}