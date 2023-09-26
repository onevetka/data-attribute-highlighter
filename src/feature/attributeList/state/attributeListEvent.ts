import { Color } from '../../../core/color/domain/entity/color';
import { AttributeName } from '../domain/entity/attributeName';

export type AttributeListEvent =
  | ToggleHighlightingEvent
  | ChangeHighlightColorEvent
  | DeleteItemEvent
  | ChangeAttributeNameInputValueEvent
  | HighlightEvent
  | ReceiveRandomEnrichmentEvent;

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

export interface HighlightEvent {
  type: 'HighlightEvent';
}

export interface ReceiveRandomEnrichmentEvent {
  type: 'ReceiveRandomEnrichmentEvent';
  payload: {
    name: AttributeName;
    color: Color;
    id: string;
  };
}
