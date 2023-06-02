import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // AUTO GENERATED INCREMENTAL ID

  //   DEFAULT PASSWORD
  if (!user.password) {
    user.password = config.DEFAULT_STUDENT_PASSWORD as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('Error creating user')
  }
  return createUser
}

export default {
  createUser,
}
