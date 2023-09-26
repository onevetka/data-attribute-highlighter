import { Color } from '../../../core/color/domain/entity/color';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListItemState } from './attributeListState';

export type AttributeListEvent =
  | ToggleHighlightingEvent
  | ChangeHighlightColorEvent
  | DeleteItemEvent
  | ChangeAttributeNameInputValueEvent
  | ChangeAttributeNameInputStatusEvent
  | HighlightEvent
  | AddAttributeToListEvent
  | SetRandomsToAttributeEvent;

export interface ToggleHighlightingEvent {
  type: 'ToggleHighlightingEvent';
  payload: {
    id: string;
  };
}

export interface ChangeHighlightColorEvent {
  type: 'ChangeHighlightColorEvent';
  payload: {
    id: string;
    color: Color;
  };
}

export interface DeleteItemEvent {
  type: 'DeleteItemEvent';
  payload: {
    id: string;
  };
}

export interface ChangeAttributeNameInputValueEvent {
  type: 'ChangeAttributeNameInputValueEvent';
  payload: {
    name: string;
  };
}

export interface ChangeAttributeNameInputStatusEvent {
  type: 'ChangeAttributeNameInputStatusEvent';
  payload: {
    status: Status;
  };
}

export interface HighlightEvent {
  type: 'HighlightEvent';
}

export interface AddAttributeToListEvent {
  type: 'AddAttributeToListEvent';
  payload: {
    attribute: AttributeListItemState;
  };
}

export interface SetRandomsToAttributeEvent {
  type: 'SetRandomsToAttributeEvent';
  payload: {
    id: string;
    color: Color;
  };
}
