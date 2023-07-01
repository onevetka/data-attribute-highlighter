import { Color } from '../../../core/color/domain/entity/color';
import { AttributeName } from '../domain/entity/attributeName';

export type AttributeListEffect =
  | SaveAttributeToChromeStorageEffect
  | MakeAttributeEffect
  | MakeAttributeRandomsEffect;

export interface SaveAttributeToChromeStorageEffect {
  type: 'saveAttributeToChromeStorage';
  payload: any;
}

export interface MakeAttributeEffect {
  type: 'makeAttribute';
  payload: {
    attributeName: AttributeName;
    knownColors: Color[];
  };
}

export interface MakeAttributeRandomsEffect {
  type: 'makeAttributeRandoms';
  payload: {
    knownColors: Color[];
  };
}
