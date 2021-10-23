import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from "../../../constants/store";
import { getListOfElementsWithAttribute } from "../../../services/document.service";
import Highlighter from "./highlighter";

/**
 * Abstraction (Interface)
 */
class Controller {
  highlighter: Highlighter;
  currentAttributeName: string = '';

  constructor(highlighter: Highlighter) {
    this.highlighter = highlighter;
    chrome.storage.local.get("highlight-data-named", (data) => {
      this.currentAttributeName = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD];
    });
  }

  public startHighlighter() {
    chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
      const attributeName = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD];

      if (this.currentAttributeName !== attributeName) {
        const foundElementsList = getListOfElementsWithAttribute(this.currentAttributeName);
        this.highlighter.remove(foundElementsList, this.currentAttributeName);
      }

      this.currentAttributeName = attributeName;

      if (!attributeName) {
        return null;
      }

      const foundElementsList = getListOfElementsWithAttribute(attributeName);
      this.highlighter.select(foundElementsList, attributeName);
    });
  }
}

const highlighter = new Highlighter();
const controller = new Controller(highlighter);

export default controller;
