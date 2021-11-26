import Shadow from "./shadow";

class ShadowService {
  public static create(color: string) {
    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = 5;

    return [shadow];
  }

  public static add(shadows: Array<Shadow>, color: string) {
    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = (shadows.length + 1) * 5;

    return [...shadows, shadow];
  }

  public static remove(originalShadows: Array<Shadow>, color: string) {
    // !!! Maybe hold hash map with data attribute name as key
    const toRemoveIndex = originalShadows.findIndex(shadow => shadow.color === color);

    if (toRemoveIndex === -1) throw new Error("The element haven't this color");

    const shadows = this.recomputeBordersWidth([
      ...originalShadows.slice(0, toRemoveIndex),
      ...originalShadows.slice(toRemoveIndex + 1)
    ]);

    return shadows;
  }

  public static shadowListToCSS(shadows: Array<Shadow>) {
    return shadows.map((shadow) => shadow.computeCSS()).join(", ");
  }

  private static recomputeBordersWidth(shadows: Array<Shadow>) {
    return shadows.map((shadow, index) => {
      shadow.spreadRadius = (index + 1) * 5;
      return shadow;
    });
  }
}

export default ShadowService;
