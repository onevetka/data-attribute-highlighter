// Entity
import Shadow from "./shadow";
import Tooltip from "./tooltip";

// Services
import ShadowService from "./shadowService";
import TooltipService, { tooltipService } from "./tooltipService";

const getHash = () => {
  return Math.random().toString(36).substr(2, 5);
};

type Selector = {
  shadows: Array<Shadow>;
  tooltip: Tooltip;
};

class Highlighter {
  public selectorsMap: Record<string, Selector>;

  constructor() {
    this.selectorsMap = {};
  }

  public add(element: HTMLElement, color: string, attributeValue: string) {
    const hasSelector = Boolean(element.dataset.highlightedElemId);
    const id = element.dataset.highlightedElemId || getHash();

    const originalShadow = this.selectorsMap[id]?.shadows;
    const originalTooltip = this.selectorsMap[id]?.tooltip;

    const shadows = hasSelector
      ? ShadowService.add(originalShadow, color)
      : ShadowService.create(color);

    const tooltip = hasSelector
      ? TooltipService.add(originalTooltip, element, color, attributeValue)
      : TooltipService.create(element, color, attributeValue);

    this.selectorsMap[id] = {
      shadows,
      tooltip
    };

    element.dataset.highlightedElemId = id;
    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);
    tooltipService.addToElement(element, tooltip);
  }

  public remove(element: HTMLElement, color: string) {
    const id = element.dataset.highlightedElemId;

    if (!id) throw new Error("This element has not highlighted");

    const originalShadows = this.selectorsMap[id].shadows;
    const originalTooltip = this.selectorsMap[id].tooltip;

    const shadows = ShadowService.remove(originalShadows, color);
    const tooltip = TooltipService.remove(originalTooltip, element, color);

    this.selectorsMap[id] = {
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
