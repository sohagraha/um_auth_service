import { Response } from 'express';

type IAPIResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IAPIResponse<T>): void => {
  const { statusCode, success, message, data: responseData } = data;
  const responseDataJSON: IAPIResponse<T> = {
    statusCode,
    success,
    message,
    data: responseData || null,
  };
  res.status(statusCode).json(responseDataJSON);
};

export default sendResponse;
