import Shadow from '../shadow';

describe('Shadow test suit', () => {
  test('Should compute correct css box-shadow', () => {
    const shadow = new Shadow();
    expect(shadow.computeCSS()).toBe('0px 0px 0px 0px #000000');
  });

  test('Should set correct offsetX', () => {
    const shadow = new Shadow();

    shadow.offsetX = 24;
    expect(shadow.computeCSS()).toBe('24px 0px 0px 0px #000000');

    shadow.offsetX = -24;
    expect(shadow.computeCSS()).toBe('-24px 0px 0px 0px #000000');
  });

  test('Should set correct offsetY', () => {
    const shadow = new Shadow();

    shadow.offsetY = 24;
    expect(shadow.computeCSS()).toBe('0px 24px 0px 0px #000000');

    shadow.offsetY = -24;
    expect(shadow.computeCSS()).toBe('0px -24px 0px 0px #000000');
  });

  test('Should set correct blurRadius', () => {
    const shadow = new Shadow();

    shadow.blurRadius = 8;
    expect(shadow.computeCSS()).toBe('0px 0px 8px 0px #000000');
  });

  test('Should set correct spreadRadius', () => {
    const shadow = new Shadow();

    shadow.spreadRadius = 4;
    expect(shadow.computeCSS()).toBe('0px 0px 0px 4px #000000');
  });

  test('Should set correct color', () => {
    const shadow = new Shadow();

    shadow.color = 'blue';
    expect(shadow.computeCSS()).toBe('0px 0px 0px 0px blue');

    shadow.color = '#FFF';
    expect(shadow.computeCSS()).toBe('0px 0px 0px 0px #FFF');

    shadow.color = '#FFFFFF';
    expect(shadow.computeCSS()).toBe('0px 0px 0px 0px #FFFFFF');

    shadow.color = 'rgb(0, 0, 0)';
    expect(shadow.computeCSS()).toBe('0px 0px 0px 0px rgb(0, 0, 0)');
  });
});
