import status from 'http-status';
import ApiError from '../../../errors/ApiError';
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
import { paginationHelpers } from '../../../helper/paginationHelper';

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

  const { page, limit, skip, sortBy } =
    paginationHelpers.calculatePagination(paginationOptions);

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortBy)
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

const getAcademicSemesterById = async (
  id: string
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.findById(id);
  if (!result) {
    throw new ApiError(status.NOT_FOUND, 'Academic Semester not found');
  }
  return result;
};

const updateAcademicSemesterById = async (
  id: string,
  updateBody: Partial<IAcademicSemester>
): Promise<IAcademicSemester> => {
  if (
    updateBody.title &&
    updateBody.code &&
    academicSemesterTitlesAndCodesMapper[updateBody.title] !== updateBody.code
  ) {
    throw new ApiError(
      status.BAD_REQUEST,
      'Academic Semester title and code does not match'
    );
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updateBody,
    {
      new: true,
    }
  );
  if (!result) {
    throw new ApiError(status.NOT_FOUND, 'Academic Semester not found');
  }
  return result;
};

const deleteAcademicSemesterById = async (
  id: string
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(status.NOT_FOUND, 'Academic Semester not found');
  }
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemesterById,
  deleteAcademicSemesterById,
};
