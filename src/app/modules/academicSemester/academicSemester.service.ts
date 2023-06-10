import ApiError from '../../../errors/ApiError';
import { academicSemesterTitlesAndCodesMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import status from 'http-status';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitlesAndCodesMapper[payload.title] !== payload.code) {
    throw new ApiError(
      status.BAD_REQUEST,
      'Academic Semester title and code does not match'
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
