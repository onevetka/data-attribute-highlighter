import { HighlighterColor } from '../entity/color';

export const getColor = (): (() => HighlighterColor) => {
  const setOfhighlighterColors = new Set(Object.values(HighlighterColor));
  const iterator = setOfhighlighterColors.values();

  return () => {
    const color = iterator.next().value;
    setOfhighlighterColors.delete(color);

    return color;
  };
};
