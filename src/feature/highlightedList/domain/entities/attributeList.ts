import { changeAttributeVisibility } from '../lib/changeAttributeVisibility/changeAttributeVisibility';
import { removeAttribute } from '../lib/removeAttribute/removeAttribute';
import { toggleAttributeInList } from '../lib/toggleAttributeInList/toggleAttributeInList';
import { Attribute } from './attribute';

export interface AttributeList {
  list: Attribute[];
  removeAttribute: (id: string) => AttributeList;
  toggleAttributeInList: (id: string) => AttributeList;
  changeAttributeVisibility: (id: string) => AttributeList;
}

export const attributeList = (attributeListData: Attribute[]) => {
  return {
    list: attributeListData,
    removeAttribute: (id: string) =>
      attributeList(removeAttribute(attributeListData, id)),
    toggleAttributeInList: (id: string) =>
      attributeList(toggleAttributeInList(attributeListData, id)),
    changeAttributeVisibility: (
      initialAttribute: Attribute,
      isHighlighted: boolean
    ) => changeAttributeVisibility(initialAttribute, isHighlighted),
  };
};
