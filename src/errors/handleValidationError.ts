import mongoose from 'mongoose'
import IGenericErrorMessage from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    error => {
      return {
        path: error?.path,
        message: error?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
