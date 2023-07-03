import { AttributeListEffect } from '../../../../feature/highlightedList/state/attributeListEffect';
import { Controller } from '../controller';

export const performer = (effect: AttributeListEffect) => {
  switch (effect.type) {
    case 'saveAttributeToChromeStorage':
      Controller.addHighlighter(effect.payload);
      break;
    case 'deleteAttributeFromChromeStorage':
      Controller.removeHighlighter(effect.payload.id);
      break;
    case 'toggleAttributeInChromeStorage':
      Controller.toggleHighlighterVisibility(effect.payload.id);
      break;
    case 'changeHighlightColorInChromeStorage':
      Controller.setHighlighterColor(effect.payload.id, effect.payload.color);
      break;
  }
};
