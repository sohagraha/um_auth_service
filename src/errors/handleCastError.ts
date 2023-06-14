import httpStatus from 'http-status';
import mongoose from 'mongoose';

const handleCastError = (error: mongoose.Error.CastError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = 'Cast Error';
  const errorMessages = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages: errorMessages,
  };
};
export default handleCastError;
