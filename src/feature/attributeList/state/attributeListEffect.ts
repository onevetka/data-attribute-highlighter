import { Color } from '../../../core/color/domain/entity/color';
import { Attribute } from '../domain/entity/attribute';
import { AttributeName } from '../domain/entity/attributeName';

export type AttributeListEffect =
  | RandomEnrichmentEffect
  | SaveChangesToStorageEffect
  | LoadAttributeListFromStorageEffect;

export interface RandomEnrichmentEffect {
  type: 'RandomEnrichmentEffect';
  payload: {
    attributeName: AttributeName;
    knownColors: Color[];
  };
}

export interface SaveChangesToStorageEffect {
  type: 'SaveChangesToStorageEffect';
  payload: {
    changes: Attribute[];
  };
}

export interface LoadAttributeListFromStorageEffect {
  type: 'LoadAttributeListFromStorageEffect';
}
