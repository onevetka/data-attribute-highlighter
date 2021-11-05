import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from "../../../constants/store";
import { getListOfElementsWithAttribute } from "../../../services/document.service";
import colorGeneratorService from "./colorGenerator.service";
import Highlighter from "./highlighter";

export type HighligherData = {
  attributeName: string;
  color: string;
  isVisible?: boolean;
}

class Controller {
  /**
   * Abstraction (Interface)
   */

  initHighlighters() {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      highlightedAttributes.forEach(({ attributeName, color }) => {
        const foundElementsList = getListOfElementsWithAttribute(attributeName);
        Highlighter.select(foundElementsList, color);
      });
    });
  }

  addHighlighter(attributeName: string) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const foundElementsList = getListOfElementsWithAttribute(attributeName);
      const color = colorGeneratorService.getColor() || 'black';
      Highlighter.select(foundElementsList, color);

      const newData = [...highlightedAttributes, { attributeName, color }];

      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: newData });
    });
  }

  removeHighlighter(id: number) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[id].attributeName);
      Highlighter.remove(foundElementsList);

      highlightedAttributes.splice(id, 1);
      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: highlightedAttributes });
    });
  }
}

const controller = new Controller();

export default controller;
