import { v4 as uuid } from 'uuid';
import { AttributeListEffect } from './effect';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { AttributeListAction } from './action';
import { sendChromeEffect } from '../../../chrome/lib/sendChromeEffect';

export const effector = (
  effect: AttributeListEffect
): AttributeListAction | void => {
  switch (effect.type) {
    case 'makeAttributeRandoms':
      return {
        type: 'setRandomsToAttribute',
        payload: {
          id: uuid(),
          color: getRandomColor({
            knownColors: effect.payload.knownColors,
          }),
        },
      };
    case 'saveAttributeToChromeStorage':
      sendChromeEffect<AttributeListEffect>(effect);
      break;
    case 'changeHighlightColorInChromeStorage':
      sendChromeEffect<AttributeListEffect>(effect);
      break;
    case 'deleteAttributeFromChromeStorage':
      sendChromeEffect<AttributeListEffect>(effect);
      break;
    case 'toggleAttributeInChromeStorage':
      sendChromeEffect<AttributeListEffect>(effect);
      break;
  }
};
