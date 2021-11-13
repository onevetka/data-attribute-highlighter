import Shadow from './shadow';

class ShadowService {
  static createShadow(color: string, width: number = 5) {
    const shadow = new Shadow();
    shadow.spreadRadius = width;
    shadow.color = color;

    return shadow.computeCSS();
  }

  static addShadow(originalShadow: string, color: string, width: number = 5) {
    const originalShadowCSSList = originalShadow
      .split(",")
      .map((substr) => substr.trim());

    const shadows = originalShadowCSSList.map((shadowCSS) => {
      const shadow = new Shadow();
      shadow.recognizeCSS(shadowCSS);

      return shadow;
    });

    const sortedShadows = shadows.sort(
      (a, b) => a.spreadRadius - b.spreadRadius
    );

    const biggestSpreadRadius = sortedShadows[0].spreadRadius;

    const newShadow = new Shadow();

    newShadow.spreadRadius = biggestSpreadRadius + width;
    newShadow.color = color;

    const resultShadow = [...sortedShadows, newShadow];

    return resultShadow.map((shadow) => shadow.computeCSS()).join(", ");
  }

  static removeShadow(originalShadow: string, color: string) {
    // const originalShadowList = originalShadow
    //   .split(",")
    //   .map((substr) => substr.trim());
    // const shadowId = this.getShadowIdByColor(originalShadowList, color);
    // originalShadowList.splice(shadowId, 1);
    // return originalShadowList;
  }

  private static getShadowIdByColor(shadowList: Array<string>, color: string) {
    // const shadowId = shadowList.findIndex((shadowItem) =>
    //   shadowItem.includes(color)
    // );
    // return shadowId;
  }
}

export default ShadowService;
