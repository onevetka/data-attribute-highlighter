import { Color } from '../../../core/color/domain/entity/color';
import { AttributeListItemState } from './attributeListState';

export type AttributeListEffect =
  | SaveAttributeToChromeStorageEffect
  | MakeAttributeRandomsEffect;

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
