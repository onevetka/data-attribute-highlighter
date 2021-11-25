import AttributeList from "../../../components/AttributeList";
import { HIGHLIGHTERS_FIELD } from "../../../constants/store";
import colorGeneratorService from "../../../services/colorGenerator.service";
import AttributeManager from "./attributeManager";

export type HighlighterData = {
  attributeName: string;
  color: string;
  isVisible: boolean;
  elements: Array<HTMLElement>;
}

class Controller {
  /**
   * Provides methods for UI
   */
  public initHighlighters() {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Record<string, HighlighterData> = data[HIGHLIGHTERS_FIELD] || [];

      Object.keys(highlightedAttributes).forEach((id) => {
        const {color, attributeName, isVisible} = highlightedAttributes[id];

        AttributeManager.add(id, attributeName, color, isVisible);
      });
    });
  }

  public addHighlighter(attributeName: string) {
    const color = colorGeneratorService.getColor() || 'black';
    const hash = Math.random().toString(36).substr(2, 5);
    const id = `${attributeName}-${hash}`;

    AttributeManager.add(id, attributeName, color, true);

    chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: AttributeManager.highlightedAttributes });
  }

  public removeHighlighter(id: string) {
    AttributeManager.remove(id);

    chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: AttributeManager.highlightedAttributes });
  }

  public toggleHighlighterVisibility(id: string) {
    const { isVisible } = AttributeManager.highlightedAttributes[id];

    if (isVisible) {
      AttributeManager.hide(id);
    } else {
      AttributeManager.show(id);
    }

    chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: AttributeManager.highlightedAttributes });
  }

  public setHighlighterColor(id: string, color: string) {
    const {} = AttributeManager.highlightedAttributes[id];
    
  }
}

const controller = new Controller();

export default controller;
