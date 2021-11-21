import Shadow from "./shadow";
import TooltipService, { Tooltip } from "./tooltip";

const getHash = () => {
  return Math.random().toString(36).substr(2, 5);
};

type Selector = {
  shadows: Array<Shadow>;
  tooltip: Tooltip;
};

class Highlighter {
  public selectedElements: Record<string, Selector>;

  constructor() {
    this.selectedElements = {};
  }

  public add(element: HTMLElement, color: string, attributeValue: string) {
    const hasSelector = Boolean(element.dataset.highlightedElemId);
    const id = element.dataset.highlightedElemId || getHash();

    const shadows = hasSelector ? this.selectedElements[id].shadows : [];
    const spreadSize = hasSelector ? (shadows.length + 1) * 5 : 5;

    const tooltip = hasSelector
      ? this.selectedElements[id].tooltip
      : new Tooltip();
    const attributes = hasSelector ? tooltip.attributes : [];

    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = spreadSize;

    const attribute = {
      label: attributeValue,
      color
    };

    tooltip.attributes = [...attributes, attribute];
    tooltip.element = element;

    this.selectedElements[id] = {
      shadows: [...shadows, shadow],
      tooltip
    };

    element.dataset.highlightedElemId = id;
    element.style.boxShadow = this.getBoxShadow(
      this.selectedElements[id].shadows
    );
    TooltipService.addToElement(element, tooltip);
  }

  public remove(element: HTMLElement, color: string) {
    const id = element.dataset.highlightedElemId;

    if (!id) throw new Error("This element has not highlighted");

    const originalShadows = this.selectedElements[id].shadows;
    const originalAttributes = this.selectedElements[id].tooltip.attributes;

    const toRemoveIndex = originalShadows.findIndex(
      (shadow) => shadow.color === color
    );

    if (toRemoveIndex === -1) throw new Error("The element haven't this color");

    const shadows = this.recomputeBordersWidth([
      ...originalShadows.slice(0, toRemoveIndex),
      ...originalShadows.slice(toRemoveIndex + 1)
    ]);

    const attributes = [
      ...originalAttributes.slice(0, toRemoveIndex),
      ...originalAttributes.slice(toRemoveIndex + 1)
    ];

    element.style.boxShadow = this.getBoxShadow(shadows);

    if (shadows.length === 0) {
      delete element.dataset.highlightedElemId;
    }

    this.selectedElements[id].shadows = shadows;
    this.selectedElements[id].tooltip.attributes = attributes;
  }

  private getBoxShadow(shadows: Array<Shadow>) {
    return shadows.map((shadow) => shadow.computeCSS()).join(", ");
  }

  private recomputeBordersWidth(shadows: Array<Shadow>) {
    return shadows.map((shadow, index) => {
      shadow.spreadRadius = (index + 1) * 5;
      return shadow;
    });
  }
}

export default new Highlighter();
