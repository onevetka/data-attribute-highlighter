import { v4 as uuid } from 'uuid';
import { AttributeListEffect } from './attributeListEffect';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { AttributeListAction } from './attributeListAction';

export const effectPerformer = (
  effect: AttributeListEffect
): AttributeListAction | void => {
  switch (effect.type) {
    case 'makeAttributeRandoms': {
      return {
        type: 'setRandomsToAttribute',
        payload: {
          id: uuid(),
          color: getRandomColor({
            knownColors: effect.payload.knownColors,
          }),
        },
      };
    }
  }
};
