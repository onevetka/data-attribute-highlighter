export default class Tooltip {
  holdingElement: HTMLElement;

  constructor() {
    const element = document.createElement("div");
    this.holdingElement = element;
    this.holdingElement.className = "tooltip";
    this.holdingElement.id = "tooltip";
  }

  setLabel(label: string) {
    this.holdingElement.innerHTML = label;
  }

  remove() {
    this.holdingElement.remove();
  }
}
