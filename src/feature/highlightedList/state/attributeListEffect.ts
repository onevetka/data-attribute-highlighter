import { AttributeName } from '../domain/entity/attributeName';

export type AttributeListEffect =
  | SaveAttributeToChromeStorageEffect
  | MakeAttributeEffect;

export interface SaveAttributeToChromeStorageEffect {
  type: 'saveAttributeToChromeStorage';
  payload: any;
}

export interface MakeAttributeEffect {
  type: 'MakeAttribute';
  payload: {
    attributeName: AttributeName;
  };
}
