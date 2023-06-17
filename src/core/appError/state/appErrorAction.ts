import { AppError } from "../domain/entity/appError"

export interface SetErrorsAction {
  type: 'setErrors'
  payload: {
    errors: AppError[],
  }
}

export interface clearErrorsAction {
  type: 'clearErrors'
}

export interface clearErrorsByPathAction {
  type: 'clearErrorsByPath'
  payload: {
    path: string[],
  }
}


export type AppErrorAction = SetErrorsAction | clearErrorsAction | clearErrorsByPathAction;