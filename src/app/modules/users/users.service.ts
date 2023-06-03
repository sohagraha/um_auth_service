import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // AUTO GENERATED INCREMENTAL ID
  const id = await generateUserId()
  user.id = id
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
