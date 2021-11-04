import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from "../../../constants/store";
import colorGeneratorService from "./colorGenerator.service";
import highlighterService, { HighligherData } from "./highlighter.service";

/**
 * Abstraction (Interface)
 */
class Controller {
  highlightedAttributes: Array<HighligherData> = [];

  constructor() {
    chrome.storage.local.get("highlight-data-named", (data) => {
      this.highlightedAttributes = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || [];
    });
    this.highlightedAttributes.forEach(({ attributeName, color }) => {
      highlighterService.addHighlighter(attributeName, color);
    })
  }

  addHighlighter(attributeName: string,) {
    const color = colorGeneratorService.getColor() || 'black';
    highlighterService.addHighlighter(attributeName, color);
  }

  // public startHighlighter() {
  //   chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
  //     const attributeName = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD];

  //     this.currentAttributeName = attributeName;

  //     if (!attributeName) {
  //       return null;
  //     }


  //     this.highlighterService.addHighlighter(attributeName);
  //   });
  // }
}

const controller = new Controller();

export default controller;
