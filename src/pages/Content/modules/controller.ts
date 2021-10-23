import { getListOfElementsWithAttribute } from "../../../services/document.service";
import Highlighter from "./highlighter";

/**
 * Abstraction (Interface)
 */
class Controller {
  highlighter: Highlighter;

  constructor(highlighter: Highlighter) {
    this.highlighter = highlighter;
  }

  public startHighlighter() {
    chrome.storage.local.get("highlight-data-named", (data) => {
      const attributeName = data['highlight-data-named'];

      if (!attributeName) {
        return null;
      }

      const foundElementsList = getListOfElementsWithAttribute(attributeName);
      this.highlighter.highlightElements(foundElementsList, attributeName);
    });
  }
}

const highlighter = new Highlighter();
const controller = new Controller(highlighter);

export default controller;
