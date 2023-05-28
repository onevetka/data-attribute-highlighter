import { Attribute } from '../../entities/attribute';

export const removeAttribute = (
  attributeList: Attribute[],
  id: string
): Attribute[] => {
  return attributeList.filter((attribute) => attribute.id === id);
};
