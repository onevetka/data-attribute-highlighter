export interface ValidateAttributeNameAction {
  type: 'validateAttributeName';
  payload: {
    name: string;
  };
}

export type ValidationAction = ValidateAttributeNameAction;
