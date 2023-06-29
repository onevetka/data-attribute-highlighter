import { Result } from 'true-myth';
import {
  AppError,
  appError,
} from '../../../../core/appError/domain/entity/appError';

export interface AttributeName {
  name: string;
}

export const attributeName = (
  data: AttributeName
): Result<AttributeName, AppError> => {
  if (data.name.length === 0) {
    return Result.err(appError({ message: 'Name is too short' }));
  }

  return Result.ok(data);
};
