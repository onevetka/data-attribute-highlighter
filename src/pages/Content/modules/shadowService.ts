import Shadow from "./shadow";

class ShadowService {
  public static create(color: string, key: string) {
    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = 5;

    return { [key]: shadow };
  }

  public static add(
    shadows: Record<string, Shadow>,
    color: string,
    key: string
  ) {
    const shadow = new Shadow();

    shadow.color = color;
    shadow.spreadRadius = (Object.keys(shadows).length + 1) * 5;

    return { ...shadows, [key]: shadow };
  }

  public static remove(originalShadows: Record<string, Shadow>, key: string) {
    const shadows = { ...originalShadows };

    delete shadows[key];

    const result = this.recomputeBordersWidth(shadows);

    return result;
  }

  public static shadowArrayToCSS(shadows: Record<string, Shadow>) {
    return Object.keys(shadows)
      .map((key) => shadows[key].computeCSS())
      .join(", ");
  }

  private static recomputeBordersWidth(
    originalShadows: Record<string, Shadow>
  ) {
    const shadows = { ...originalShadows };
    Object.keys(shadows).forEach((key, index) => {
      shadows[key].spreadRadius = (index + 1) * 5;
    });
    return shadows;
  }
}

export default ShadowService;
