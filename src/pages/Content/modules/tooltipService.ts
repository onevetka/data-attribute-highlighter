import Tooltip from "./tooltip";

const addTooltipToDocument = () => {
  const tooltip = document.createElement("div");

  tooltip.className = "tooltip";
  tooltip.id = "tooltip";

  document.body.appendChild(tooltip);

  return tooltip;
};

class TooltipService {
  tooltip: HTMLElement;

  constructor() {
    this.tooltip = document.getElementById("tooltip") || addTooltipToDocument();
  }

  public static create(color: string, attributeValue: string, id: string) {
    const tooltip = new Tooltip();

    const attribute = {
      label: attributeValue,
      color
    };

    const attributes = { [id]: attribute };

    tooltip.attributes = attributes;

    return tooltip;
  }

  public static add(
    originalTooltip: Tooltip,
    color: string,
    attributeValue: string,
    id: string
  ) {
    const attribute = {
      label: attributeValue,
      color
    };

    const tooltip = { ...originalTooltip };

    tooltip.attributes = { ...tooltip.attributes, [id]: attribute };

    return tooltip;
  }

  public static remove(originalTooltip: Tooltip, id: string) {
    const tooltip = { ...originalTooltip };

    const originalAttributes = tooltip.attributes;

    const attributes = { ...originalAttributes };

    delete attributes[id];

    tooltip.attributes = attributes;

    return tooltip;
  }

  public static getListOfAttributes(tooltip: Tooltip) {
    const { attributes } = tooltip;
    return Object.keys(attributes).map((key) => attributes[key]);
  }

  public removeFromElement(element: HTMLElement, tooltip: Tooltip) {}

  public addToElement(element: HTMLElement, tooltip: Tooltip) {
    if (element === null) {
      console.log("Can not read element");
      return null;
    }

    element.addEventListener("mousemove", (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      const attributeViewList = TooltipService.getListOfAttributes(tooltip).map(
        (attribute) =>
          `<div class="tooltip-list-item"><span class="color-indicator" style="background: ${attribute.color}"></span><span>${attribute.label}</span></div>`
      );

      this.tooltip.innerHTML = attributeViewList.join("");

      this.drawTooltipByCoordinates(x, y, this.tooltip);

      if (event.target === element) {
        event.stopPropagation();
      }
    });

    element.addEventListener("mouseleave", () =>
      this.hideTooltip(this.tooltip)
    );
  }

  private hideTooltip(tooltip: HTMLElement | null) {
    if (tooltip === null) {
      return null;
    }

    tooltip.style.display = "none";
    tooltip.style.visibility = "hidden";
    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
  }

  private drawTooltipByCoordinates(
    x: number,
    y: number,
    tooltip: HTMLElement | null
  ) {
    if (tooltip === null) {
      return null;
    }

    tooltip.style.left = `${x + 16}px`;
    tooltip.style.top = `${y + 16}px`;
    tooltip.style.display = "block";
    tooltip.style.visibility = "visible";
  }
}

export default TooltipService;
export const tooltipService = new TooltipService();
