import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IchangePassword,
} from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IchangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;

//   // check user exist
//   const isUserExist = await User.isUserExist(user?.userId);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   //check old password
//   const isPasswordMatched = await User.isPasswordMatched(
//     oldPassword,
//     isUserExist.password
//   );
//   if (!isPasswordMatched) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }

//   //  hash new password
//   const hashedPassword = await bcrypt.hash(
//     newPassword,
//     Number(config.BCRYPT_SALT_ROUNDS)
//   );

//   //update password
//   await User.findOneAndUpdate(
//     { _id: user?.userId },
//     {
//       password: hashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: Date.now(),
//     }
//   );
// };

const changePassword = async (
  user: JwtPayload | null,
  payload: IchangePassword
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { oldPassword, newPassword } = payload;

  // check user exist alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //check old password
  const isPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // updating using save method

  // data update korar por save method use korte hobe

  isUserExist.needsPasswordChange = false;
  // isUserExist.password = newPassword;
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
