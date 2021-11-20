import { getListOfElementsWithAttribute } from "../../../services/document.service";
import { HighlighterData } from "./controller";
import highlighter from "./highlighter";

class Manipulator {
  public highlightedAttributes: Record<string, HighlighterData>;

  constructor() {
    this.highlightedAttributes = {};
  }

  public add(
    id: string,
    attributeName: string,
    color: string,
    isVisible: boolean
  ) {
    const elements = getListOfElementsWithAttribute(attributeName);

    if (elements.length === 0) {
      console.log(`Can not find element with attribute: ${attributeName}`);
      return;
    }

    if (id in this.highlightedAttributes) {
      console.log(`id: ${id} already exist`);
      return;
    }

    if (isVisible) {
      elements.forEach((element) => highlighter.add(element, color));
    }

    this.highlightedAttributes[id] = {
      attributeName,
      color,
      isVisible,
      elements
    };
  }

  public remove(id: string) {
    const attribute = this.highlightedAttributes[id];

    if (!attribute) {
      console.log(`Can not find attribute with id: ${id}`);
      return;
    }

    const { elements, color, isVisible } = attribute;

    if (isVisible) {
      elements.forEach((element) => highlighter.remove(element, color));
    }

    delete this.highlightedAttributes[id]
  }

  public hide(id: string) {
    const attribute = this.highlightedAttributes[id];

    if (!attribute) {
      console.log(`Can not find attribute with id: ${id}`);
      return;
    }

    const { elements, color, isVisible } = attribute;

    if (!isVisible) {
      console.log(`Attribute with id: ${id} already hided`);
      return;
    }

    elements.forEach(element => highlighter.remove(element, color));

    attribute.isVisible = false;
  }

  public show(id: string) {
    const attribute = this.highlightedAttributes[id];

    const { elements, color, isVisible } = attribute;

    if (isVisible) {
      console.log(`id: ${id} already showed`);
      return;
    }

    elements.forEach(element => highlighter.add(element, color));

    attribute.isVisible = true;
  }
}

const manipulator = new Manipulator();

export default new Manipulator();