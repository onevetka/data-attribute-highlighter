import { Color } from '../../../core/color/domain/entity/color';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListEffect } from './effect';

export interface AttributeListItemState {
  id: string;
  name: string;
  isHighlighted: boolean;
  color: Color;
}

export const attributeListItemState = (
  data: Partial<AttributeListItemState> = {}
): AttributeListItemState => {
  return {
    id: '',
    name: '',
    isHighlighted: false,
    color: '#000000',
    ...data,
  };
};

export interface AttributeListState {
  attributeNameInputValue: string;
  attributeList: AttributeListItemState[];
  attributeNameInputStatus: Status;
  effects: AttributeListEffect[];
}

export const attributeListState = (
  data: Partial<AttributeListState> = {}
): AttributeListState => {
  return {
    attributeNameInputValue: '',
    attributeNameInputStatus: Status.Default,
    attributeList: data.attributeList?.map(attributeListItemState) || [],
    effects: [],
    ...data,
  };
};
