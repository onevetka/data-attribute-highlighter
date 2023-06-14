export interface AttributeListItemState {
  name: string;
  isHighlighted: boolean;
  color: string;
}

export const attributeListItemState = (data: Partial<AttributeListItemState> = {}): AttributeListItemState => {
  return {
    name: '',
    isHighlighted: false,
    color: '#000000',
    ...data,
  }
}

export interface AttributeListState {
  attributeNameInputValue: string;
  attributeList: AttributeListItemState[];
}

export const attributeListState = (data: Partial<AttributeListState> = {}): AttributeListState => {
  return {
    attributeNameInputValue: '',
    attributeList: data.attributeList?.map(attributeListItemState) || [],
    ...data,
  }
}