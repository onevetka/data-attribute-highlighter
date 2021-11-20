import AttributeList from "../../../components/AttributeList";
import { HIGHLIGHTERS_FIELD } from "../../../constants/store";
import colorGeneratorService from "../../../services/colorGenerator.service";
import manipulator from "./manipulator";

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
  initHighlighters() {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes: Record<string, HighlighterData> = data[HIGHLIGHTERS_FIELD] || [];

      Object.keys(highlightedAttributes).forEach((id) => {
        const {color, attributeName, isVisible} = highlightedAttributes[id];

        manipulator.add(id, attributeName, color, isVisible);
      });
    });
  }

  addHighlighter(attributeName: string) {
    const color = colorGeneratorService.getColor() || 'black';
    const hash = Math.random().toString(36).substr(2, 5);
    const id = `${attributeName}-${hash}`;

    manipulator.add(id, attributeName, color, true);

    chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: manipulator.highlightedAttributes });
  }

  removeHighlighter(id: string) {
    manipulator.remove(id);

    chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: manipulator.highlightedAttributes });
  }

  toggleHighlighterVisibility(id: string) {
    const { isVisible } = manipulator.highlightedAttributes[id];

    if (isVisible) {
      manipulator.hide(id);
    } else {
      manipulator.show(id);
    }

    chrome.storage.local.set({ [HIGHLIGHTERS_FIELD]: manipulator.highlightedAttributes });
  }
}

const controller = new Controller();

export default controller;
