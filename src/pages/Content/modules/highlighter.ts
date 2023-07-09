// Entity
import Shadow from './shadow';
import Tooltip from './tooltip';
import Attribute from './attribute';

// Services
import ShadowService from './shadowService';
import TooltipService from './tooltipService';

const getHash = (name: string) => {
  return `${name}-${Math.random().toString(36).substr(2, 5)}`;
};

type Selector = {
  shadows: Record<string, Shadow>;
  tooltip: Tooltip;
  // FIXME: ТУТ!
  attributes: Record<string, Attribute>;
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
    // FIXME: И ТУТ!

    const originalShadow = this.selectorsMap[elementId]?.shadows;
    const originalAttributes = this.selectorsMap[elementId]?.attributes;

    const tooltip = hasSelector
      ? this.selectorsMap[elementId]?.tooltip
      : new Tooltip();

    const shadows = hasSelector
      ? ShadowService.add(originalShadow, color, id)
      : ShadowService.create(color, id);

    const attributes = hasSelector
      ? TooltipService.add(originalAttributes, color, attributeValue, id)
      : TooltipService.create(color, attributeValue, id);

    tooltip.setLabel(TooltipService.getLabelFromAttributeList(attributes));

    this.selectorsMap[elementId] = {
      shadows,
      tooltip,
      attributes,
    };

    element.dataset.highlightedElemId = elementId;
    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);

    TooltipService.hangOnElement(element, tooltip);
  }

  public remove(element: HTMLElement, id: string) {
    const elementId = element.dataset.highlightedElemId;

    if (!elementId) throw new Error('This element has not highlighted');

    const originalShadows = this.selectorsMap[elementId].shadows;
    const originalAttributes = this.selectorsMap[elementId]?.attributes;
    const tooltip = this.selectorsMap[elementId]?.tooltip;

    const shadows = ShadowService.remove(originalShadows, id);
    const attributes = TooltipService.remove(originalAttributes, id);

    tooltip.setLabel(TooltipService.getLabelFromAttributeList(attributes));

    this.selectorsMap[elementId] = {
      shadows,
      tooltip,
      attributes,
    };

    if (Object.keys(shadows).length === 0) {
      TooltipService.removeFromElement(element, tooltip);
      tooltip.remove();
      delete element.dataset.highlightedElemId;
    }

    element.style.boxShadow = ShadowService.shadowArrayToCSS(shadows);
  }
}

export default new Highlighter();
