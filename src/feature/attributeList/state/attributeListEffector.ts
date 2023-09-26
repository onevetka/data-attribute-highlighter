import { AttributeListEffect } from './attributeListEffect';
import { v4 as uuid } from 'uuid';
import { sendChromeEffect } from '../../../chrome/lib/sendChromeEffect';
import { Dispatch } from '../../../core/imperativeShell/domain/entity/dispatch';
import { AttributeListEvent } from './attributeListEvent';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';

export const attributeListEffector = (
  effect: AttributeListEffect,
  injection: { dispatch: Dispatch<AttributeListEvent> }
) => {
  switch (effect.type) {
    case 'MakeAttributeRandomsEffect':
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
    case 'SaveAttributeToChromeStorageEffect':
      sendChromeEffect(effect);
      break;
    case 'ChangeHighlightColorInChromeStorageEffect':
      sendChromeEffect(effect);
      break;
    case 'DeleteAttributeFromChromeStorageEffect':
      sendChromeEffect(effect);
      break;
    case 'ToggleAttributeInChromeStorageEffect':
      sendChromeEffect(effect);
      break;
  }
};
