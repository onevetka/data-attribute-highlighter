import { HighlighterColor } from '../entity/color';
import { getRandomColor } from './getRandomColor';

it('When given an empty list of already known colors, it outputs a color from the set', () => {
  expect(getRandomColor({ knownColors: [] })).toBe(HighlighterColor.Blue);
});

it('When an array of known colors is passed, it returns one that is not in this list', () => {
  const setOfKnownColors = new Set([
    HighlighterColor.Blue,
    HighlighterColor.Green,
    HighlighterColor.Purple,
  ]);

  const color = getRandomColor({
    knownColors: Array.from(setOfKnownColors),
  });

  expect(setOfKnownColors.has(color)).toBeFalsy();
});

it('When the designer colors is over, return gray', () => {
  const setOfKnownColors = new Set(Object.values(HighlighterColor));

  const color = getRandomColor({ knownColors: Array.from(setOfKnownColors) });

  expect(color).toBe(HighlighterColor.Gray);
});
