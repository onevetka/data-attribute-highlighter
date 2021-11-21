type Attribute = {
  label: string;
  color: string;
};

export class Tooltip {
  attributes: Array<Attribute> = [];

  element: HTMLElement | null = null;
}

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

  private hideTooltip(tooltip: HTMLElement | null) {
    if (tooltip === null) {
      return null;
    }

    tooltip.style.display = "none";
    tooltip.style.visibility = "hidden";
    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
  }
}

export default new TooltipService();
