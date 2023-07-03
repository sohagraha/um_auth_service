import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLES } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.STUDENT
  ),
  AcademicFacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  auth(
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.FACULTY
  ),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.STUDENT
  ),
  AcademicFacultyController.getAllFaculties
);

export const AcademicFacultyRoutes = router;
