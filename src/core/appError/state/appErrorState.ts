import { AppError } from '../domain/entity/appError';

export interface AppErrorData {
  errors: AppError[];
}

export type AppErrorState = AppErrorData;

export const appErrorState = (
  data: Partial<AppErrorData> = {}
): AppErrorData => ({
  errors: [],
  ...data,
});
