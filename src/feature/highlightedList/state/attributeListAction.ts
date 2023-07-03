import { Color } from '../../../core/color/domain/entity/color';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListItemState } from './attributeListState';

export type AttributeListAction =
  | ToggleHighlightingAction
  | ChangeHighlightColorAction
  | DeleteItemAction
  | ChangeAttributeNameInputValueAction
  | ChangeAttributeNameInputStatusAction
  | HighlightAction
  | AddAttributeToListAction
  | SetRandomsToAttributeAction;

export interface ToggleHighlightingAction {
  type: 'toggleHighlighting';
  payload: {
    id: number;
  };
}

export interface ChangeHighlightColorAction {
  type: 'changeHighlightColor';
  payload: {
    id: string;
    color: Color;
  };
}

export interface DeleteItemAction {
  type: 'deleteItem';
  payload: {
    id: number;
  };
}

export interface ChangeAttributeNameInputValueAction {
  type: 'changeAttributeNameInputValue';
  payload: {
    name: string;
  };
}

export interface ChangeAttributeNameInputStatusAction {
  type: 'changeAttributeNameInputStatus';
  payload: {
    status: Status;
  };
}

export interface HighlightAction {
  type: 'highlight';
}

export interface AddAttributeToListAction {
  type: 'addAttributeToList';
  payload: {
    attribute: AttributeListItemState;
  };
}

export interface SetRandomsToAttributeAction {
  type: 'setRandomsToAttribute';
  payload: {
    id: string;
    color: Color;
  };
}
