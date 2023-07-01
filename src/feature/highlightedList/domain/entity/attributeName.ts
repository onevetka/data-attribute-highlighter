import { Result } from 'true-myth';
import {
  AppError,
  appError,
} from '../../../../core/appError/domain/entity/appError';

const attributeNameError: Record<'tooShortName', AppError> = {
  tooShortName: appError({
    code: 'ERROR_TOO_SHORT_ATTRIBUTE_NAME',
    message: 'Name is too short',
  }),
};

export class AttributeName {
  public readonly string: string;

  public static parse(rawString: string): Result<AttributeName, AppError> {
    if (rawString.length === 0) {
      return Result.err(attributeNameError.tooShortName);
    }

    return Result.ok(new AttributeName(rawString));
  }

  private constructor(string: string) {
    this.string = string;
  }
}
