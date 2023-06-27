import { HighlighterColor } from '../../../../shared/color/domain/entity/color';

// export type RGB = `rgb(${number}, ${number}, ${number})`;
// export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = HEX | HighlighterColor;
