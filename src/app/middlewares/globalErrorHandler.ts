import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { Error } from 'mongoose'
import { error } from 'winston'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import IGenericErrorMessage from '../../interfaces/error'

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] | undefined = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler

//path:
//message:

// import { NextFunction, Request, Response } from 'express'
// import {error} from 'winston'
// import config from '../../config'
// import IGenericErrorMessage from '../../interfaces/error'
// import handleValidationError from '../../errors/handleValidationError'
// import ApiError from '../../errors/ApiError'

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let statusCode = err.statusCode || 500
//   let message = err.message || 'Internal Server Error'
//   let errorMessages: IGenericErrorMessage[] | [] | undefined = []

//   if (err.name === 'ValidationError') {
//     const simplifiedError = handleValidationError(err)
//     statusCode = simplifiedError.statusCode
//     message = simplifiedError.message
//     errorMessages = simplifiedError.errorMessages
//   } else if (error instanceof Error) {
//     message = error.message
//     errorMessages = error?.message
//       ? [
//           {
//             path: '',
//             message: error?.message || 'Internal Server Error',
//           },
//         ]
//       : []
//   } else if (error instanceof ApiError) {
//     statusCode = error.statusCode
//     message = error.message
//     errorMessages = error.message
//       ? [
//           {
//             path: '',
//             message: error.message || 'Internal Server Error',
//           },
//         ]
//       : []
//   }

//   res.status(err.statusCode || 500).json({
//     success: false,
//     statusCode: statusCode,
//     message: message,
//     errorMessages: errorMessages,
//     stack: config.env === 'development' ? err.stack : undefined,
//   })
//   next()
// }

// export default globalErrorHandler
