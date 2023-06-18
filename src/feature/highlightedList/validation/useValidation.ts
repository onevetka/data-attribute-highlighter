import { useReducer } from 'react';
import { validationReducer } from './validationReducer';
import { validationState } from './validationState';

export const useValidation = () => {
  const [state, dispatch] = useReducer(validationReducer, validationState());

  const validateAttributeName = (name: string) => {
    dispatch({ type: 'validateAttributeName', payload: { name } });
  };

  return {
    state,
    validateAttributeName,
  };
};
