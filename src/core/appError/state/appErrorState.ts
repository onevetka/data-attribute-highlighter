import { AppError } from "../domain/enitity/appError";

export interface AppErrorState {
  errors: AppError[],
}

export const appErrorState = () => ({
  errors: [],
})