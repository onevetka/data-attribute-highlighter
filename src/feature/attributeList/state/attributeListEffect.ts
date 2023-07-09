import { Color } from '../../../core/color/domain/entity/color';
import { AttributeListItemState } from './attributeListState';

export type AttributeListEffect =
  | SaveAttributeToChromeStorageEffect
  | MakeAttributeRandomsEffect
  | ChangeHighlightColorInChromeStorageEffect
  | DeleteAttributeFromChromeStorageEffect
  | ToggleAttributeInChromeStorageEffect;

export interface SaveAttributeToChromeStorageEffect {
  type: 'saveAttributeToChromeStorage';
  payload: {
    attribute: AttributeListItemState;
  };
}

export interface MakeAttributeRandomsEffect {
  type: 'makeAttributeRandoms';
  payload: {
    knownColors: Color[];
  };
}

export interface ChangeHighlightColorInChromeStorageEffect {
  type: 'changeHighlightColorInChromeStorage';
  payload: {
    color: Color;
    id: string;
  };
}

export interface DeleteAttributeFromChromeStorageEffect {
  type: 'deleteAttributeFromChromeStorage';
  payload: {
    id: string;
  };
}

export interface ToggleAttributeInChromeStorageEffect {
  type: 'toggleAttributeInChromeStorage';
  payload: {
    id: string;
  };
}
