import ShadowService from "../shadowService";

describe("ShadowService test suit", () => {
  test("create: Should return a list with one element of the correct color", () => {
    const shadows = ShadowService.create("blue", "sdfghre");

    expect(shadows["sdfghre"].computeCSS()).toBe("0px 0px 0px 5px blue");
  });

  test("shadowArrayToCSS: Should return a list without the selected element", () => {
    const shadowBlue = ShadowService.create("blue", "sdfghre");
    const shadowBlueRed = ShadowService.add(shadowBlue, "red", "fasadlk");
    const shadowBlueRedBlack = ShadowService.add(
      shadowBlueRed,
      "red",
      "alwe9rw"
    );

    expect(ShadowService.shadowArrayToCSS(shadowBlueRedBlack)).toBe(
      "0px 0px 0px 5px blue, 0px 0px 0px 10px red, 0px 0px 0px 15px red"
    );
  });

  test("add: Must return a list with more than one element count", () => {
    const originalShadows = ShadowService.create("blue", "alasdf9rw");
    const shadows = ShadowService.add(originalShadows, "red", "ala9weqwrw");

    expect(ShadowService.shadowArrayToCSS(shadows)).toBe(
      "0px 0px 0px 5px blue, 0px 0px 0px 10px red"
    );
  });

  test("remove: Should return a list without the selected element", () => {
    const originalShadows = ShadowService.create("blue", "qdsfax");
    const shadows = ShadowService.add(originalShadows, "red", "acbnm");
    const shadowsWithoutElement = ShadowService.remove(shadows, "acbnm");

    expect(ShadowService.shadowArrayToCSS(shadowsWithoutElement)).toBe(
      "0px 0px 0px 5px blue"
    );
  });
});
