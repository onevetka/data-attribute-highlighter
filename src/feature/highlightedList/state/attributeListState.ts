export interface AttributeListState {
  isHighlighted: boolean;
}

export const attributeListState = (data: Partial<AttributeListState> = {}): AttributeListState => {
  return {
    isHighlighted: false,
    ...data,
  }
}