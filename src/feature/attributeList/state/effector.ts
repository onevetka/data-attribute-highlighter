import { AttributeListEffect } from './effect';
import { v4 as uuid } from 'uuid';
import { sendChromeEffect } from '../../../chrome/lib/sendChromeEffect';
import { Dispatch } from '../../../core/imperativeShell/domain/entity/dispatch';
import { AttributeListEvent } from './attributeListEvent';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';

export const effector = (
  effect: AttributeListEffect,
  injection: { dispatch: Dispatch<AttributeListEvent> }
) => {
  switch (effect.type) {
    case 'makeAttributeRandoms':
      setTimeout(() => {
        injection.dispatch({
          type: 'SetRandomsToAttributeEvent',
          payload: {
            id: uuid(),
            color: getRandomColor({
              knownColors: effect.payload.knownColors,
            }),
          },
        });
      }, 5000);
      break;
    case 'saveAttributeToChromeStorage':
      sendChromeEffect(effect);
      break;
    case 'changeHighlightColorInChromeStorage':
      sendChromeEffect(effect);
      break;
    case 'deleteAttributeFromChromeStorage':
      sendChromeEffect(effect);
      break;
    case 'toggleAttributeInChromeStorage':
      sendChromeEffect(effect);
      break;
  }
};
