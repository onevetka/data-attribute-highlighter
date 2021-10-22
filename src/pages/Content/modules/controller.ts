import { getListOfElementsWithAttribute } from "../../../services/document.service";
import Highlighter from "./highlighter";

class Controller {

  public static startHighlighter() {
    chrome.storage.local.get("highlight-data-named", (data) => {
      const attributeName = data['highlight-data-named'];

      if (!attributeName) {
        return null;
      }
  
      const foundElementsList = getListOfElementsWithAttribute(attributeName);
      const highlighter = new Highlighter(attributeName);
      highlighter.highlightElements(foundElementsList);
    });
  }
}

export default Controller;
