import { User } from './users.model'

export const findLastUserId = async () => {
  const lasUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  const incrementedId = (parseInt(lasUser?.id || '0') + 1)
    .toString()
    .padStart(4, '0')

  return incrementedId
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(4, '0')
  return currentId
}
