import { Attribute } from '../../entities/attribute';
import { changeAttributeVisibility } from '../changeAttributeVisibility/changeAttributeVisibility';

export const toggleAttributeInList = (
  list: Attribute[],
  id: string
): Attribute[] => {
  const index = list.findIndex((listItem) => listItem.id === id);
  const foundedAttribute = list[index];

  if (foundedAttribute) {
    const newAttributeState = changeAttributeVisibility(
      foundedAttribute,
      !foundedAttribute.isHighlighted
    );

    list[index] = newAttributeState;
  }

  return list;
};
