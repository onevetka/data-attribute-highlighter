import { Color } from '../../../../core/color/domain/entity/color';
import { HighlighterColor } from '../entity/color';

interface GetRandomColorProps {
  knownColors: Color[];
}

export const getRandomColor = ({
  knownColors,
}: GetRandomColorProps): HighlighterColor => {
  const knownColorsSet = new Set(knownColors);
  const highlighterColors = Object.values(HighlighterColor);

  for (let color of highlighterColors) {
    if (!knownColorsSet.has(color)) {
      return color;
    }
  }

  return HighlighterColor.Gray;
};
