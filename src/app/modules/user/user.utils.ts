import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastUserId = async () => {
  const lasUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  const incrementedId = (parseInt(lasUser?.id || '0') + 1)
    .toString()
    .padStart(4, '0');

  return incrementedId;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(4, '0');
  return currentId;
};

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(4, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lasFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lasFaculty?.id;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(4, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  incrementedId = `F${incrementedId}`;
  return incrementedId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lasFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lasFaculty?.id;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(4, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  incrementedId = `A${incrementedId}`;
  return incrementedId;
};
