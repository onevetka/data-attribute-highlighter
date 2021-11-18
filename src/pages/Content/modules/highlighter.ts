// import { addTooltipToDocument, drawTooltipByCoordinates, deleteTooltip } from './tooltip';
import Shadow from './shadow';

const getHash = () => {
  return Math.random().toString(36).substr(2, 5);
};

class Highlighter {
  public selectedElements: Record<string, Array<Shadow>>;

  constructor() {
    this.selectedElements = {};
  }

  public add(element: HTMLElement, color: string) {
    const hasShadows = Boolean(element.dataset.highlightedElemId);
    const id = element.dataset.highlightedElemId || getHash();

    const shadows = hasShadows ? this.selectedElements[id] : [];
    const spreadSize = hasShadows ? (shadows.length + 1) * 5 : 5;

    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = spreadSize;

    element.dataset.highlightedElemId = id;
    element.style.boxShadow = this.getBoxShadow([...shadows, shadow]);

    this.selectedElements[id] = [...shadows, shadow];
  }

  public remove(element: HTMLElement, color: string) {
    const id = element.dataset.highlightedElemId;

    if (!id) throw new Error("This element has not highlighted");

    const originalShadows = this.selectedElements[id];

    const toRemoveIndex = originalShadows.findIndex(
      (shadow) => shadow.color === color
    );

    if (toRemoveIndex === -1) throw new Error("The element haven't this color");

    const shadows = this.recomputeBordersWidth([
      ...originalShadows.slice(0, toRemoveIndex),
      ...originalShadows.slice(toRemoveIndex + 1)
    ]);

    element.style.boxShadow = this.getBoxShadow(shadows);
    
    if (shadows.length === 0) {
      delete element.dataset.highlightedElemId;
    }

    this.selectedElements[id] = shadows;
  }

  private getBoxShadow(shadows: Array<Shadow>) {
    return shadows.map((shadow) => shadow.computeCSS()).join(", ");
  }

  private recomputeBordersWidth(shadows: Array<Shadow>) {
    return shadows.map((shadow, index) => {
      shadow.spreadRadius = (index + 1) * 5;
      return shadow;
    });
  }
}

export default new Highlighter();
