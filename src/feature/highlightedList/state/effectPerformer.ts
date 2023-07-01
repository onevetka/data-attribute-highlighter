import { attribute } from '../domain/entity/attribute';
import { AttributeListEffect } from './attributeListEffect';

export const effectPerformer = (effect: AttributeListEffect) => {
  switch (effect.type) {
    case 'MakeAttribute':
      const newAttribute = attribute({});
  }
};
