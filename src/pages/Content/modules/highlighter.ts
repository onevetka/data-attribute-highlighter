// import { addTooltipToDocument, drawTooltipByCoordinates, deleteTooltip } from './tooltip';
import Shadow from './shadow';

const getHash = () => {
  return Math.random().toString(36).substr(2, 5);
};

class Highlighter {
  public selectedElements: Record<string, Array<Shadow>> = {};

  public add(element: HTMLElement, color: string) {
    const id = element.dataset.highlighterId;
    if (id) {
      const shadows = this.selectedElements[id];
      const spreadSize = (shadows.length + 1) * 5;

      const shadow = new Shadow();

      shadow.color = color;
      shadow.spreadRadius = spreadSize;

      shadows.push(shadow);

      element.style.boxShadow = this.getBoxShadow(shadows);

      this.selectedElements[id] = shadows;
    } else {
      const shadow = new Shadow();
      const uniqId = getHash();

      shadow.color = color;
      shadow.spreadRadius = 5;

      element.style.boxShadow = shadow.computeCSS();
      element.dataset.highlighterId = uniqId;

      this.selectedElements[uniqId] = [shadow];
    }
  }

  public remove(element: HTMLElement, color: string) {
    const id = element.dataset.highlighterId;

    if (!id) {
      throw new Error("This element have not this color");
    }

    const originalShadows = this.selectedElements[id];
    const toRemoveIndex = originalShadows.findIndex(
      (shadow) => shadow.color === color
    );
    const shadows = this.recomputeBordersWidth([
      ...originalShadows.slice(0, toRemoveIndex),
      ...originalShadows.slice(toRemoveIndex + 1)
    ]);

    element.style.boxShadow = this.getBoxShadow(shadows);

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
