import Attribute from "./attribute";
import Tooltip from "./tooltip";

class TooltipService {
  public static create(color: string, attributeValue: string, id: string) {
    const attribute: Attribute = {
      value: attributeValue,
      color
    };

    const attributes = { [id]: attribute };

    return attributes;
  }

  public static add(
    originalAttributes: Record<string, Attribute>,
    color: string,
    attributeValue: string,
    id: string
  ) {
    const attribute: Attribute = {
      value: attributeValue,
      color
    };

    const attributes = { ...originalAttributes, [id]: attribute };

    return attributes;
  }

  public static remove(
    originalAttributes: Record<string, Attribute>,
    id: string
  ) {
    const attributes = { ...originalAttributes };

    delete attributes[id];

    return attributes;
  }

  public static getLabelFromAttributeList(attributes: any) {
    const attributeViewList = Object.keys(attributes).map(
      (key: string) =>
        `<div class="tooltip-list-item"><span class="color-indicator" style="background: ${attributes[key].color}"></span><span>${attributes[key].value}</span></div>`
    );
    return attributeViewList.join("");
  }

  public static hangOnElement(element: HTMLElement, tooltip: Tooltip) {
    element.appendChild(tooltip.holdingElement);

    element.addEventListener("mousemove", this.handleDrawTooltipByMousemove);
    element.addEventListener("mouseout", this.handleHideTooltipBuyMouseout);
    element.addEventListener("mouseover", this.handleShowTooltipByMouseover);
  }

  public static removeFromElement(element: HTMLElement, tooltip: Tooltip) {
    element.removeChild(tooltip.holdingElement);

    element.removeEventListener("mousemove", this.handleDrawTooltipByMousemove);
    element.removeEventListener("mouseout", this.handleHideTooltipBuyMouseout);
    element.removeEventListener("mouseover", this.handleShowTooltipByMouseover);
  }

  /**
   * Event callbacks
   * TODO: Move to other place
   */

  private static handleDrawTooltipByMousemove(event: any) {
    const tooltip = event.currentTarget.querySelector(":scope > .tooltip");

    if (!tooltip) {
      return;
    }

    tooltip.style.left = `${event.clientX + 10}px`;

    tooltip.style.top = `${event.clientY + 10}px`;
  }

  private static handleHideTooltipBuyMouseout(event: any) {
    const tooltip = event.currentTarget.querySelector(":scope > .tooltip");

    if (!tooltip) {
      return;
    }

    tooltip.style.display = "none";
    tooltip.visibility = "hide";
  }

  private static handleShowTooltipByMouseover(event: any) {
    const tooltip = event.currentTarget.querySelector(":scope > .tooltip");

    if (!tooltip) {
      return;
    }

    const relatedTooltip = event.relatedTarget?.querySelector(
      ":scope > .tooltip"
    );

    if (relatedTooltip) {
      relatedTooltip.style.display = "none";
      relatedTooltip.visibility = "hide";
    }

    tooltip.style.display = "block";
    tooltip.visibility = "visible";

    event.stopPropagation();
  }
}

export default TooltipService;
