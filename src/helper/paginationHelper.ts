import { SortOrder } from 'mongoose';

type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  sort?: {
    [key: string]: SortOrder;
  };
};

const calculatePagination = (options: IPaginationOptions): IOptionResult => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  const skip = (page - 1) * limit;
  const sort = {
    [sortBy]: sortOrder,
  };
  return {
    page,
    limit,
    skip,
    sort,
  };
};

export const paginationHelper = {
  calculatePagination,
};
