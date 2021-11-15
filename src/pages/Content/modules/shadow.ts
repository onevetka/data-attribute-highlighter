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
}

export default Shadow;
