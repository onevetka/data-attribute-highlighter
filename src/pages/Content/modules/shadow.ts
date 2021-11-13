import validateColor from './validateColor';

const INSET_EXIST_REGEXP = /^inset.*$/;
const SHADOW_VALUES_REGEXP = /^(inset )?(\W?|[\d]px ){4}.*$/;

class Shadow {
  /**
   * Class providing api for working with box-shadow
   */
  public inset: boolean;
  public offsetX: number;
  public offsetY: number;
  public blurRadius: number;
  public spreadRadius: number;
  public color: string;
  public notation: "px" | "rem";

  constructor() {
    this.inset = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.blurRadius = 0;
    this.spreadRadius = 0;
    this.color = "#000000";
    this.notation = "px";
  }

  public computeCSS() {
    const insetCSS = this.inset ? "inset " : "";
    const offsetXCSS = `${this.offsetX}${this.notation}`;
    const offsetYCSS = `${this.offsetY}${this.notation}`;
    const blurRadiusCSS = `${this.blurRadius}${this.notation}`;
    const spreadRadiusCSS = `${this.spreadRadius}${this.notation}`;

    const shadowCSS =
      insetCSS +
      `${offsetXCSS} ${offsetYCSS} ${blurRadiusCSS} ${spreadRadiusCSS} ${this.color}`;

    return shadowCSS;
  }

  public recognizeCSS(shadowCSS: string) {
    const valuesList = shadowCSS.split(" ");

    const isValidShadowValues = SHADOW_VALUES_REGEXP.test(shadowCSS);
    const isValidColor = validateColor(valuesList[5] || valuesList[4]);

    if (!isValidColor || !isValidShadowValues) {
      throw new Error(`Irrelevant shadow css string: ${shadowCSS}`);
    }

    const isInsetShadow = INSET_EXIST_REGEXP.test(shadowCSS);

    this.offsetX = parseInt(valuesList[isInsetShadow ? 1 : 0], 10);
    this.offsetY = parseInt(valuesList[isInsetShadow ? 2 : 1], 10);
    this.blurRadius = parseInt(valuesList[isInsetShadow ? 3 : 2], 10);
    this.spreadRadius = parseInt(valuesList[isInsetShadow ? 4 : 3], 10);
    this.color = valuesList[isInsetShadow ? 5 : 4];

    this.inset = isInsetShadow;
    this.notation = "px";
  }
}

export default Shadow;
