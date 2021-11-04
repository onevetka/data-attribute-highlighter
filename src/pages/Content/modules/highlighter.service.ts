import { getListOfElementsWithAttribute } from "../../../services/document.service";
import Highlighter from "./highlighter";

export type HighligherData = {
  attributeName: string;
  color: string;
  isVisible?: boolean;
}

/**
 * Abstraction (Interface)
 */
class HighlighterService {
  private listOfHighlighters: Array<HighligherData>;

  constructor() {
    this.listOfHighlighters = [];
  }

  public addHighlighter(attributeName: string, color: string) {
    const foundElementsList = getListOfElementsWithAttribute(attributeName);

    Highlighter.select(foundElementsList, color);

    this.listOfHighlighters.push({ attributeName, color });
  }

  public removeHighlighter(id: number) {
    if (id < 0 || id > this.listOfHighlighters.length) {
      throw new Error(`Incorrect index of Highlighter. The range of correct values [0, ${this.listOfHighlighters.length}]. Current value is ${id}`)
    }

    const foundElementsList = getListOfElementsWithAttribute(this.listOfHighlighters[id].attributeName);

    Highlighter.remove(foundElementsList);

    this.listOfHighlighters.splice(id, 1);
  }
}

export default new HighlighterService();
