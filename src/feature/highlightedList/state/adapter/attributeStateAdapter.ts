import { Attribute } from '../../domain/entity/attribute';
import { AttributeListItemState } from '../attributeListState';

export const attributeStateAdapter = (
  data: Attribute
): AttributeListItemState => {
  return {
    id: data.id,
    name: data.name.string,
    color: data.color,
    isHighlighted: data.isHighlighted,
  };
};
