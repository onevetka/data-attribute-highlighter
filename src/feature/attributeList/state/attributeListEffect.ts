import { Color } from '../../../core/color/domain/entity/color';
import { AttributeListItemState } from './attributeListState';

export type AttributeListEffect =
  | SaveAttributeToChromeStorageEffect
  | MakeAttributeRandomsEffect
  | ChangeHighlightColorInChromeStorageEffect
  | DeleteAttributeFromChromeStorageEffect
  | ToggleAttributeInChromeStorageEffect;

export interface SaveAttributeToChromeStorageEffect {
  type: 'SaveAttributeToChromeStorageEffect';
  payload: {
    attribute: AttributeListItemState;
  };
}

export interface MakeAttributeRandomsEffect {
  type: 'MakeAttributeRandomsEffect';
  payload: {
    knownColors: Color[];
  };
}

export interface ChangeHighlightColorInChromeStorageEffect {
  type: 'ChangeHighlightColorInChromeStorageEffect';
  payload: {
    color: Color;
    id: string;
  };
}

export interface DeleteAttributeFromChromeStorageEffect {
  type: 'DeleteAttributeFromChromeStorageEffect';
  payload: {
    id: string;
  };
}

export interface ToggleAttributeInChromeStorageEffect {
  type: 'ToggleAttributeInChromeStorageEffect';
  payload: {
    id: string;
  };
}
