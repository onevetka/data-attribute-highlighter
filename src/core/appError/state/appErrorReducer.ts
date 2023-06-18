import _ from 'lodash';
import {
  AppErrorAction,
  SetErrorsAction,
  clearErrorsByPathAction,
} from './appErrorAction';
import { AppErrorState } from './appErrorState';

export const appErrorReducer = (
  state: AppErrorState,
  action: AppErrorAction
): AppErrorState => {
  switch (action.type) {
    case 'setErrors':
      return setErrors(state, action);
    case 'clearErrors':
      return clearErrors(state);
    case 'clearErrorsByPath':
      return clearErrorsByPath(state, action);
    default:
      return state;
  }
};

function setErrors(
  state: AppErrorState,
  action: SetErrorsAction
): AppErrorState {
  return {
    ...state,
    errors: action.payload.errors,
  };
}

function clearErrors(state: AppErrorState): AppErrorState {
  return {
    ...state,
    errors: [],
  };
}

function clearErrorsByPath(
  state: AppErrorState,
  action: clearErrorsByPathAction
): AppErrorState {
  return {
    ...state,
    errors: state.errors.filter(
      (error) => !_.isEqual(error.path, action.payload.path)
    ),
  };
}
