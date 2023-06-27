import { HighlighterColor } from '../entity/color';
import { getColor } from './getColor';

it('Returns new colors six times', () => {
  const getter = getColor();

  expect(getter()).toEqual(HighlighterColor.Blue);
  expect(getter()).toEqual(HighlighterColor.Yellow);
  expect(getter()).toEqual(HighlighterColor.Pink);
  expect(getter()).toEqual(HighlighterColor.Green);
  expect(getter()).toEqual(HighlighterColor.Purple);
  expect(getter()).toEqual(HighlighterColor.Toxic);
});
