import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // AUTO GENERATED INCREMENTAL ID
  const id = await generateUserId();
  user.id = id;
  //   DEFAULT PASSWORD
  if (!user.password) {
    user.password = config.DEFAULT_STUDENT_PASSWORD as string;
  }
  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(500, 'User not created');
  }
  return createUser;
};

export const UserService = {
  createUser,
};
