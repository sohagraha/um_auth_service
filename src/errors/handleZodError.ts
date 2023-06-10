import { IGenericErrorResponse } from '../interfaces/common';
import IGenericErrorMessage from '../interfaces/error';
import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error?.issues.map(
    (issue: ZodIssue) => {
      return {
        //   path: error?.path.join('.'),
        path: issue?.path[issue?.path?.length - 1 || 0],
        message: issue?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
