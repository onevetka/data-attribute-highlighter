import { AttributeListEffect } from './attributeListEffect';
import { v4 as uuid } from 'uuid';
import { sendChromeEffect } from '../../../chrome/lib/sendChromeEffect';
import { Dispatch } from '../../../core/imperativeShell/domain/entity/dispatch';
import { AttributeListEvent } from './attributeListEvent';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { HIGHLIGHTERS_FIELD } from '../../../constants/store';

export const attributeListEffector = (
  effect: AttributeListEffect,
  injection: { dispatch: Dispatch<AttributeListEvent> }
) => {
  switch (effect.type) {
    case 'RandomEnrichmentEffect':
      injection.dispatch({
        type: 'ReceiveRandomEnrichmentEvent',
        payload: {
          id: uuid(),
          name: effect.payload.attributeName,
          color: getRandomColor({
            knownColors: effect.payload.knownColors,
          }),
        },
      });
      break;
    case 'LoadAttributeListFromStorageEffect':
      chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) =>
        injection.dispatch({
          type: 'ReceiveAttributeListEvent',
          payload: {
            attributeList: data[HIGHLIGHTERS_FIELD] || [],
          },
        })
      );
      break;
    case 'SaveChangesToStorageEffect':
      sendChromeEffect(effect);
      break;
  }
};
