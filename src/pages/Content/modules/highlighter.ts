import Shadow from "./shadow";
import TooltipService, { Tooltip } from "./tooltip";

const getHash = () => {
  return Math.random().toString(36).substr(2, 5);
};

type Selector = {
  shadows: Array<Shadow>;
  tooltip: Tooltip;
};

class ShadowService {
  public static create(color: string) {
    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = 5;

    return [shadow];
  }

  public static add(shadows: Array<Shadow>, color: string) {
    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = (shadows.length + 1) * 5;

    return [...shadows, shadow];
  }

  public static remove(originalShadows: Array<Shadow>, color: string) {
    const toRemoveIndex = originalShadows.findIndex(shadow => shadow.color === color);

    if (toRemoveIndex === -1) throw new Error("The element haven't this color");

    const shadows = this.recomputeBordersWidth([
      ...originalShadows.slice(0, toRemoveIndex),
      ...originalShadows.slice(toRemoveIndex + 1)
    ]);

    return shadows;
  }

  public static shadowArrayToCSS(shadows: Array<Shadow>) {
    return shadows.map((shadow) => shadow.computeCSS()).join(", ");
  }

  private static recomputeBordersWidth(shadows: Array<Shadow>) {
    return shadows.map((shadow, index) => {
      shadow.spreadRadius = (index + 1) * 5;
      return shadow;
    });
  }
}

class TooltipDumpService {
  public static create(element: HTMLElement, color: string, attributeValue: string) {
    const tooltip = new Tooltip();

    const attribute = {
      label: attributeValue,
      color,
    };

    const attributes = [attribute];

    tooltip.element = element;
    tooltip.attributes = attributes;

    return tooltip;
  }

  public static add(tooltip: Tooltip, element: HTMLElement, color: string, attributeValue: string) {
    // !!! Mutable data
    const attribute = {
      label: attributeValue,
      color,
    };

    tooltip.attributes = [...tooltip.attributes, attribute];

    return tooltip;
  }

  public static remove(tooltip: Tooltip, element: HTMLElement, color: string) {
    const toRemoveIndex = tooltip.attributes.findIndex(attribute => attribute.color === color);
    const originalAttributes = tooltip.attributes;

    const attributes = [
      ...originalAttributes.slice(0, toRemoveIndex),
      ...originalAttributes.slice(toRemoveIndex + 1)
    ];

    tooltip.attributes = attributes;

    return tooltip;
  }
}

class Highlighter {
  public selectedElements: Record<string, Selector>;

  constructor() {
    this.selectedElements = {};
  }

  public add(element: HTMLElement, color: string, attributeValue: string) {
    const hasSelector = Boolean(element.dataset.highlightedElemId);
    const id = element.dataset.highlightedElemId || getHash();

    const originalShadow = this.selectedElements[id]?.shadows;
    const originalTooltip = this.selectedElements[id]?.tooltip;

    const shadows = hasSelector
      ? ShadowService.add(originalShadow, color)
      : ShadowService.create(color);

    const tooltip = hasSelector
      ? TooltipDumpService.add(originalTooltip, element, color, attributeValue)
      : TooltipDumpService.create(element, color, attributeValue);

    this.selectedElements[id] = {
      shadows,
      tooltip
    };

    element.dataset.highlightedElemId = id;
    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);
    TooltipService.addToElement(element, tooltip);
  }

  public remove(element: HTMLElement, color: string) {
    const id = element.dataset.highlightedElemId;

    if (!id) throw new Error("This element has not highlighted");

    const originalShadows = this.selectedElements[id].shadows;
    const originalTooltip = this.selectedElements[id].tooltip;

    const shadows = ShadowService.remove(originalShadows, color);
    const tooltip = TooltipDumpService.remove(originalTooltip, element, color);

    this.selectedElements[id] = {
      shadows,
      tooltip,
    }

    if (shadows.length === 0) {
      delete element.dataset.highlightedElemId;
    }

    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);
  }
}

export default new Highlighter();
