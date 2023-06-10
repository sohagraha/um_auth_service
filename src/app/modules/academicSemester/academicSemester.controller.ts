import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const newUser = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      success: true,
      data: newUser,
      statusCode: httpStatus.CREATED,
      message: 'Academic Semester created successfully',
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
