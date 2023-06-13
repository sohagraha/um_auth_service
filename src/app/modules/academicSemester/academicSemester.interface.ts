import { Model } from 'mongoose';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCodes = '01' | '02' | '03';

type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: string;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilter = {
  searchTerm?: string;
};

export { IAcademicSemester, AcademicSemesterModel };
