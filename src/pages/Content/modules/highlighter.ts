import Shadow from "./shadow";
import TooltipService, { Tooltip } from "./tooltip";

const getHash = () => {
  return Math.random().toString(36).substr(2, 5);
};

type Selector = {
  shadow: Shadow;
  tooltip: Tooltip;
};

class Highlighter {
  public selectedElements: Record<string, Array<Selector>>;

  constructor() {
    this.selectedElements = {};
  }

  public add(element: HTMLElement, color: string, attributeValue: string) {
    const hasSelectors = Boolean(element.dataset.highlightedElemId);
    const id = element.dataset.highlightedElemId || getHash();

    const selectors = hasSelectors ? this.selectedElements[id] : [];
    const spreadSize = hasSelectors ? (selectors.length + 1) * 5 : 5;

    const shadow = new Shadow();
    const tooltip = new Tooltip();

    shadow.color = color;
    shadow.spreadRadius = spreadSize;

    tooltip.color = color;
    tooltip.element = element;
    tooltip.label = attributeValue;

    const selector = { shadow, tooltip };

    this.selectedElements[id] = [...selectors, selector];

    element.dataset.highlightedElemId = id;
    element.style.boxShadow = this.getBoxShadow(this.selectedElements[id]);
    TooltipService.addToElement(
      element,
      this.getTooltipLabel(this.selectedElements[id])
    );
  }

  public remove(element: HTMLElement, color: string) {
    const id = element.dataset.highlightedElemId;

    if (!id) throw new Error("This element has not highlighted");

    const originalSelectors = this.selectedElements[id];

    const toRemoveIndex = originalSelectors.findIndex(
      (selector) => selector.shadow.color === color
    );

    if (toRemoveIndex === -1) throw new Error("The element haven't this color");

    const selectors = this.recomputeBordersWidth([
      ...originalSelectors.slice(0, toRemoveIndex),
      ...originalSelectors.slice(toRemoveIndex + 1)
    ]);

    element.style.boxShadow = this.getBoxShadow(selectors);

    if (selectors.length === 0) {
      delete element.dataset.highlightedElemId;
    }

    this.selectedElements[id] = selectors;
  }

  private getBoxShadow(selectors: Array<Selector>) {
    return selectors.map((selector) => selector.shadow.computeCSS()).join(", ");
  }

  private getTooltipLabel(selectors: Array<Selector>) {
    return selectors.map((selector) => selector.tooltip.label).join(", ");
  }

  private recomputeBordersWidth(selectors: Array<Selector>) {
    return selectors.map((selector, index) => {
      selector.shadow.spreadRadius = (index + 1) * 5;
      return selector;
    });
  }
}

export default new Highlighter();
