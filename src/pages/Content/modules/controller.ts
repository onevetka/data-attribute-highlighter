import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from "../../../constants/store";
import colorGeneratorService from "./colorGenerator.service";
import highlighterService, { HighligherData } from "./highlighter.service";

/**
 * Abstraction (Interface)
 */
class Controller {
  highlightedAttributes: Array<HighligherData> = [];

  constructor() {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      this.highlightedAttributes = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      this.highlightedAttributes.forEach(({ attributeName, color }) => {
        highlighterService.addHighlighter(attributeName, color);
      });

      console.log(`highlightedAttributes`, this.highlightedAttributes);
    });
  }

  addHighlighter(attributeName: string) {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const color = colorGeneratorService.getColor() || 'black';
      highlighterService.addHighlighter(attributeName, color);

      const highlightedAttributes = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];

      const newData = [...highlightedAttributes, { attributeName, color }];

      chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: newData });
    });
  }
}

const controller = new Controller();

export default controller;
