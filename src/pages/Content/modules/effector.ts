import { HIGHLIGHTERS_FIELD } from '../../../constants/store';
import { AttributeListEffect } from '../../../feature/attributeList/state/attributeListEffect';

export const effector = (effect: AttributeListEffect) => {
  switch (effect.type) {
    case 'SaveChangesToStorageEffect':
      chrome.storage.local.set({
        [HIGHLIGHTERS_FIELD]: effect.payload.changes,
      });
      break;
    default:
      break;
  }
};
