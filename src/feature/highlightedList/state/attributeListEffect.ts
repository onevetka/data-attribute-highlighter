import { Color } from '../../../core/color/domain/entity/color';

export type AttributeListEffect =
  | SaveAttributeToChromeStorageEffect
  | MakeAttributeRandomsEffect;

export interface SaveAttributeToChromeStorageEffect {
  type: 'saveAttributeToChromeStorage';
  payload: any;
}

export interface MakeAttributeRandomsEffect {
  type: 'makeAttributeRandoms';
  payload: {
    knownColors: Color[];
  };
}
