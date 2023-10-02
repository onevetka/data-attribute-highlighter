import { Color } from '../../../core/color/domain/entity/color';
import { Attribute } from '../domain/entity/attribute';
import { AttributeName } from '../domain/entity/attributeName';

export type AttributeListEffect =
  | RandomEnrichmentEffect
  | SaveAttributeToStorageEffect
  | RemoveAttributeFromStorageEffect
  | SaveAttributeToChromeStorageEffect
  | ChangeHighlightColorInChromeStorageEffect
  | DeleteAttributeFromChromeStorageEffect
  | ToggleAttributeInChromeStorageEffect;

export interface RandomEnrichmentEffect {
  type: 'RandomEnrichmentEffect';
  payload: {
    attributeName: AttributeName;
    knownColors: Color[];
  };
}

export interface SaveAttributeToStorageEffect {
  type: 'SaveAttributeToStorageEffect';
  payload: {
    attribute: Attribute;
  };
}

export interface RemoveAttributeFromStorageEffect {
  type: 'RemoveAttributeFromStorageEffect';
  payload: {
    id: string;
  };
}

//

export interface SaveAttributeToChromeStorageEffect {
  type: 'SaveAttributeToChromeStorageEffect';
  payload: {
    attribute: Attribute;
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
