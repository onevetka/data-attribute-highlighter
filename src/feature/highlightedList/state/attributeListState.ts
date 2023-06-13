export interface AttributeListState {
  isHighlighted: boolean;
  color: string;
}

export const attributeListState = (data: Partial<AttributeListState> = {}): AttributeListState => {
  return {
    isHighlighted: false,
    color: '#000000',
    ...data,
  }
}