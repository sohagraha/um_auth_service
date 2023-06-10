import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const newUser = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    res.status(201).json({
      success: true,
      meaaage: 'Academic Semester created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemester,
};
