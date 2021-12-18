import highlighter from "./highlighter";

export function getListOfElementsWithAttribute(
  attributeName: string
): Array<HTMLElement> {
  const foundElements = document.querySelectorAll(`[${attributeName}]`);
  const foundElementsList = Array.from(foundElements);

  // FIXME
  return foundElementsList as Array<HTMLElement>;
}

export type HighlighterData = {
  attributeName: string;
  color: string;
  isVisible: boolean;
  elements: Array<HTMLElement>;
};

//

class AttributeManager {
  /**
   * Holds record with current highlighters added to app
   */
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
    }

    if (id in this.highlightedAttributes) {
      console.log(`id: ${id} already exist`);
      return;
    }

    if (isVisible) {
      elements?.forEach((element) => {
        const attributeValue = element.getAttribute(attributeName) || "";
        highlighter.add(element, color, attributeValue, id);
      });
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

    const { elements, isVisible } = attribute;

    if (isVisible) {
      elements.forEach((element) => highlighter.remove(element, id));
    }

    delete this.highlightedAttributes[id];
  }

  public hide(id: string) {
    const attribute = this.highlightedAttributes[id];

    if (!attribute) {
      console.log(`Can not find attribute with id: ${id}`);
      return;
    }

    const { elements, isVisible } = attribute;

    if (!isVisible) {
      console.log(`Attribute with id: ${id} already hided`);
      return;
    }

    elements.forEach((element) => highlighter.remove(element, id));

    attribute.isVisible = false;
  }

  public show(id: string) {
    const attribute = this.highlightedAttributes[id];

    const { elements, color, attributeName, isVisible } = attribute;

    if (isVisible) {
      console.log(`id: ${id} already showed`);
      return;
    }

    elements.forEach((element) => {
      const attributeValue = element.getAttribute(attributeName) || "";
      highlighter.add(element, color, attributeValue, id);
    });

    attribute.isVisible = true;
  }
}

export default new AttributeManager();
