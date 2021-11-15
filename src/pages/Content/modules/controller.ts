import { HIGHLIGHTERS_FIELD } from "../../../constants/store";
import { getListOfElementsWithAttribute } from "../../../services/document.service";
import colorGeneratorService from "../../../services/colorGenerator.service";
import Highlighter from "./highlighter";

export type HighligherData = {
  id: string;
  attributeName: string;
  color: string;
  isVisible?: boolean;
}

class Controller {
  /**
   * Provides methods for managing highlighters
   */

  initHighlighters() {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[HIGHLIGHTERS_FIELD] || [];

      highlightedAttributes.forEach(({ attributeName, color, isVisible }) => {
        if (isVisible) {
          const foundElementsList = getListOfElementsWithAttribute(attributeName);
          foundElementsList.forEach(element => Highlighter.add(element, color))
        }
      });
    });
  }

  addHighlighter(attributeName: string) {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

      const foundElementsList = getListOfElementsWithAttribute(attributeName);
      const color = colorGeneratorService.getColor() || 'black';

      foundElementsList.forEach(element => Highlighter.add(element, color))

      const hash = Math.random().toString(36).substr(2, 5);
      const id = `${attributeName}-${hash}`;

      const newData = [...highlightedAttributes, { id, attributeName, color, isVisible: true }];

      chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: newData });
    });
  }

  removeHighlighter(id: string) {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[HIGHLIGHTERS_FIELD] || [];

      const index = highlightedAttributes.findIndex(attribute => attribute.id === id);

      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[index].attributeName);

      foundElementsList.forEach(element => Highlighter.remove(element, highlightedAttributes[index].color));

      highlightedAttributes.splice(index, 1);
      chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: highlightedAttributes });
    });
  }

  showHighlighter(id: string) {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[HIGHLIGHTERS_FIELD] || [];

      const index = highlightedAttributes.findIndex(attribute => attribute.id === id);
      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[index].attributeName);
      const color = highlightedAttributes[index].color;
      foundElementsList.forEach(element => Highlighter.add(element, color))

      highlightedAttributes[index].isVisible = true;
      chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: highlightedAttributes });
    });
  }

  hideHighlighter(id: string) {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Array<HighligherData> = data[HIGHLIGHTERS_FIELD] || [];

      const index = highlightedAttributes.findIndex(attribute => attribute.id === id);
      const foundElementsList = getListOfElementsWithAttribute(highlightedAttributes[index].attributeName);
      foundElementsList.forEach(element => Highlighter.remove(element, highlightedAttributes[index].color));

      highlightedAttributes[index].isVisible = false;
      chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: highlightedAttributes });
    });
  }
}

const controller = new Controller();

export default controller;
