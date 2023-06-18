import { Status } from '../../../core/status/domain/entity/status';
import {
  ValidateAttributeNameAction,
  ValidationAction,
} from './validationAction';
import { ValidationState } from './validationState';

export const validationReducer = (
  state: ValidationState,
  action: ValidationAction
): ValidationState => {
  switch (action.type) {
    case 'validateAttributeName':
      return validateAttributeName(state, action);
    default:
      return state;
  }
};

function validateAttributeName(
  state: ValidationState,
  action: ValidateAttributeNameAction
): ValidationState {
  const name = action.payload.name;

  if (name.length === 0) {
    return {
      ...state,
      attributeNameInputStatus: Status.Error,
    };
  }

  return {
    ...state,
    attributeNameInputStatus: Status.Default,
  };
}
