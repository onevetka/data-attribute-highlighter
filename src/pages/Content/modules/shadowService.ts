import Shadow from './shadow';

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

    this.recomputeBordersWidth(shadows);

    return shadows;
  }

  public static shadowArrayToCSS(shadows: Record<string, Shadow>) {
    return Object.values(shadows)
      .map((shadow) => shadow.computeCSS())
      .join(', ');
  }

  private static recomputeBordersWidth(shadows: Record<string, Shadow>) {
    return Object.values(shadows).forEach((shadow, index) => {
      shadow.spreadRadius = (index + 1) * 5;
    });
  }
}

export default ShadowService;
