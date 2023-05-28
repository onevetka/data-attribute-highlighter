import { Attribute, attribute } from '../../entities/attribute';

export const changeAttributeVisibility = (
  initialAttribute: Attribute,
  isHighlighted: boolean
): Attribute => {
  return attribute({ ...initialAttribute, isHighlighted });
};
