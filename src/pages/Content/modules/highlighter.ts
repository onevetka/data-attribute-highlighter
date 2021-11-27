// Entity
import Shadow from "./shadow";
import Tooltip from "./tooltip";

// Services
import ShadowService from "./shadowService";
import TooltipService, { tooltipService } from "./tooltipService";

const getHash = (name: string) => {
  return `${name}-${Math.random().toString(36).substr(2, 5)}`;
};

type Selector = {
  shadows: Record<string, Shadow>;
  tooltip: Tooltip;
};

class Highlighter {
  public selectorsMap: Record<string, Selector>;

  constructor() {
    this.selectorsMap = {};
  }

  public add(
    element: HTMLElement,
    color: string,
    attributeValue: string,
    id: string
  ) {
    const hasSelector = Boolean(element.dataset.highlightedElemId);
    const elementId =
      element.dataset.highlightedElemId || getHash(attributeValue);

    const originalShadow = this.selectorsMap[elementId]?.shadows;
    const originalTooltip = this.selectorsMap[elementId]?.tooltip;

    const shadows = hasSelector
      ? ShadowService.add(originalShadow, color, id)
      : ShadowService.create(color, id);

    const tooltip = hasSelector
      ? TooltipService.add(originalTooltip, color, attributeValue, id)
      : TooltipService.create(color, attributeValue, id);

    this.selectorsMap[elementId] = {
      shadows,
      tooltip
    };

    element.dataset.highlightedElemId = elementId;
    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);
    tooltipService.addToElement(element, tooltip);
  }

  public remove(element: HTMLElement, id: string) {
    const elementId = element.dataset.highlightedElemId;

    if (!elementId) throw new Error("This element has not highlighted");

    const originalShadows = this.selectorsMap[elementId].shadows;
    const originalTooltip = this.selectorsMap[elementId].tooltip;

    const shadows = ShadowService.remove(originalShadows, id);
    const tooltip = TooltipService.remove(originalTooltip, id);

    this.selectorsMap[elementId] = {
      shadows,
      tooltip
    };

    if (Object.keys(shadows).length === 0) {
      delete element.dataset.highlightedElemId;
      // tooltipService.removeFromElement(element, tooltip);
    }

    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);
    tooltipService.addToElement(element, tooltip);
  }
}

export default new Highlighter();
