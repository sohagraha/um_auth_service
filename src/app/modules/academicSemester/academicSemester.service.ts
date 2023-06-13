import status from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields,
  academicSemesterTitlesAndCodesMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

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

const getAllAcademicSemesters = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  // search by searchTerm
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // filter by other fields
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object?.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const { page, limit, skip, sort } =
    paginationHelper.calculatePagination(paginationOptions);

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
};
