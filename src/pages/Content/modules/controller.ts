import { HIGHLIGHTERS_FIELD } from '../../../constants/store';
import { AttributeListItemState } from '../../../feature/highlightedList/state/attributeListState';
import { attributeManager } from './attributeManager';

export type HighlighterData = {
  attributeName: string;
  color: string;
  isVisible: boolean;
  elements: Array<HTMLElement>;
};

export class Controller {
  /**
   * Provides methods for UI
   */
  public static initHighlighters() {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Record<string, HighlighterData> =
        data[HIGHLIGHTERS_FIELD] || [];

      Object.keys(highlightedAttributes).forEach((id) => {
        const { color, attributeName, isVisible } = highlightedAttributes[id];

        attributeManager.add(id, attributeName, color, isVisible);
      });
    });
  }

  public static addHighlighter(payload: { attribute: AttributeListItemState }) {
    const { id, name, isHighlighted, color } = payload.attribute;

    attributeManager.add(id, name, color, isHighlighted);

    chrome.storage.local.set({
      [HIGHLIGHTERS_FIELD]: attributeManager.highlightedAttributes,
    });
  }

  public static removeHighlighter(id: string) {
    attributeManager.remove(id);

    chrome.storage.local.set({
      [HIGHLIGHTERS_FIELD]: attributeManager.highlightedAttributes,
    });
  }

  public static toggleHighlighterVisibility(id: string) {
    const { isVisible } = attributeManager.highlightedAttributes[id];

    if (isVisible) {
      attributeManager.hide(id);
    } else {
      attributeManager.show(id);
    }

    chrome.storage.local.set({
      [HIGHLIGHTERS_FIELD]: attributeManager.highlightedAttributes,
    });
  }

  public static setHighlighterColor(id: string, color: string) {
    const highlighter = { ...attributeManager.highlightedAttributes[id] };
    highlighter.color = color;

    attributeManager.highlightedAttributes[id] = highlighter;
    attributeManager.hide(id);
    attributeManager.show(id);

    chrome.storage.local.set({
      [HIGHLIGHTERS_FIELD]: attributeManager.highlightedAttributes,
    });
  }
}
