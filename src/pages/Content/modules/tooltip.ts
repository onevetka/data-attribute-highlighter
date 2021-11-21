export class Tooltip {
  label: string = "";
  color: string = "";
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

  public addToElement(element: HTMLElement, label: string) {
    if (element === null) {
      console.log("Can not read element");
      return null;
    }

    element.addEventListener("mousemove", (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      this.drawTooltipByCoordinates(x, y, label, this.tooltip);

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
    label: string,
    tooltip: HTMLElement | null
  ) {
    if (tooltip === null) {
      return null;
    }

    tooltip.innerText = label;
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
