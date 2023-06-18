import { useReducer } from 'react';
import { appErrorState } from './appErrorState';
import { appErrorReducer } from './appErrorReducer';
import { AppError } from '../domain/entity/appError';

export const useErrors = () => {
  const [state, dispatch] = useReducer(appErrorReducer, appErrorState());

  const setErrors = (errors: AppError[]) => {
    dispatch({ type: 'setErrors', payload: { errors } });
  };

  const clearErrors = () => {
    dispatch({ type: 'clearErrors' });
  };

  const clearErrorsByPath = (path: string[]) => {
    dispatch({ type: 'clearErrorsByPath', payload: { path } });
  };

  return {
    state,
    setErrors,
    clearErrors,
    clearErrorsByPath,
  };
};
