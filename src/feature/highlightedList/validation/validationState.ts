import { Status } from "../../../core/status/domain/entity/status";

export interface ValidationState {
  attributeNameInputStatus: Status;
}

export const validationState = (data: Partial<ValidationState> = {}): ValidationState => {
  return {
    attributeNameInputStatus: Status.Default,
    ...data,
  }
}