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

  public addToElement(element: HTMLElement, tooltip: Tooltip) {
    if (element === null) {
      console.log("Can not read element");
      return null;
    }

    element.addEventListener("mousemove", (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      const attributeViewList = tooltip.attributes.map(
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
