import { v4 as uuid } from 'uuid';
import { AttributeListEffect } from './attributeListEffect';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { AttributeListAction } from './attributeListAction';

export const effectPerformer = (
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
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id || 0;

        chrome.tabs.sendMessage(tabId, {
          messageType: 'highlight-data',
          attributeName: effect.payload.attribute.name,
        });
      });
      break;
    case 'changeHighlightColorInChromeStorage':
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id || 0;

        chrome.tabs.sendMessage(tabId, {
          messageType: 'change-highlighter-color',
          id: effect.payload.id,
          color: effect.payload.color,
        });
      });
  }
};
