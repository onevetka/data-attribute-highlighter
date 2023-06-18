import { Status } from "../../../core/status/domain/entity/status";

export interface ToggleHighlightingAction {
  type: 'toggleHighlighting'
  payload: {
    id: number,
  }
}

export interface ChangeHighlightColorAction {
  type: 'changeHighlightColor'
  payload: {
    id: number,
    color: string;
  }
}

export interface DeleteItemAction {
  type: 'deleteItem'
  payload: {
    id: number,
  }
}

export interface ChangeAttributeNameInputValueAction {
  type: 'changeAttributeNameInputValue'
  payload: {
    name: string;
  }
}

export interface SaveNewAttributeAction {
  type: 'saveNewAttribute'
}

export interface ChangeAttributeNameInputStatusAction {
  type: 'changeAttributeNameInputStatus'
  payload: {
    status: Status;
  }
}

export type AttributeListAction =
  ToggleHighlightingAction |
  ChangeHighlightColorAction |
  DeleteItemAction |
  ChangeAttributeNameInputValueAction |
  SaveNewAttributeAction |
  ChangeAttributeNameInputStatusAction;