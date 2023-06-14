import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';
import { IAcademicSemester } from './academicSemester.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../const/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const newUser = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    sendResponse<IAcademicSemester>(res, {
      success: true,
      data: newUser,
      statusCode: httpStatus.CREATED,
      message: 'Academic Semester created successfully',
    });
    next();
  }
);

const getAllAcademicSemesters: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllAcademicSemesters(
      filters,
      paginationOptions as IPaginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      data: result.data,
      meta: result.meta,
      statusCode: httpStatus.OK,
      message: 'Academic Semesters Retrieved successfully',
    });
    next();
  }
);

const getAcademicSemesterById: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getAcademicSemesterById(id);
    sendResponse<IAcademicSemester>(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Retrieved successfully',
    });
    next();
  }
);

const updateAcademicSemesterById: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.updateAcademicSemesterById(
      id,
      academicSemesterData
    );
    sendResponse<IAcademicSemester>(res, {
      success: true,
      data: result,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Updated successfully',
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemesterById,
};
