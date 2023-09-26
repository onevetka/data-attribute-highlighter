import { Color } from '../../../../core/color/domain/entity/color';
import { AttributeName } from './attributeName';

export class Attribute {
  id: string;
  name: AttributeName;
  color: Color;
  isHighlighted: boolean;

  constructor({
    id,
    name,
    color,
    isHighlighted,
  }: {
    id: string;
    name: AttributeName;
    color: Color;
    isHighlighted: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.isHighlighted = isHighlighted;
  }
}
