import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from "../../../constants/store";
import { getListOfElementsWithAttribute } from "../../../services/document.service";
import colorGeneratorService from "./colorGenerator.service";
import Highlighter from "./highlighter";

export type HighligherData = {
  id: string;
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

      highlightedAttributes.forEach(({ attributeName, color, isVisible }) => {
        if (isVisible) {
          const foundElementsList = getListOfElementsWithAttribute(attributeName);
          Highlighter.select(foundElementsList, color);
        }
      });
    });
  }

  addHighlighter(attributeName: string) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const foundElementsList = getListOfElementsWithAttribute(attributeName);
      const color = colorGeneratorService.getColor() || 'black';
      Highlighter.select(foundElementsList, color);

      const hash = Math.random().toString(36).substr(2, 5);
      const id = `${attributeName}-${hash}`;

      const newData = [...highlightedAttributes, { id, attributeName, color, isVisible: true }];

      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: newData });
    });
  }

  removeHighlighter(id: string) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const index = highlightedAttributes.findIndex(attribute => attribute.id === id);

      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[index].attributeName);
      Highlighter.remove(foundElementsList);

      highlightedAttributes.splice(index, 1);
      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: highlightedAttributes });
    });
  }

  showHighlighter(id: string) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const index = highlightedAttributes.findIndex(attribute => attribute.id === id);
      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[index].attributeName);
      const color = highlightedAttributes[index].color;
      Highlighter.select(foundElementsList, color);

      highlightedAttributes[index].isVisible = true;
      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: highlightedAttributes });
    });
  }

  hideHighlighter(id: string) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const index = highlightedAttributes.findIndex(attribute => attribute.id === id);
      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[index].attributeName);
      Highlighter.remove(foundElementsList);

      highlightedAttributes[index].isVisible = false;
      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: highlightedAttributes });
    });
  }
}

const controller = new Controller();

export default controller;
