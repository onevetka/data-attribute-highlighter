export interface AppError {
  code: string;
  message: string;
  path: string[];
}

export const appError = (data: Partial<AppError>): AppError => {
  return {
    code: '',
    message: '',
    path: [],
    ...data,
  }
}