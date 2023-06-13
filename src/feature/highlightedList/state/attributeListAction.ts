export interface AttributeListAction {
  type: '' | 'toggleHighlighting' | 'changeHighlightColor'
  payload: {
    color: string;
  }
}

export const attributeListAction = (data: Partial<AttributeListAction> = {}): AttributeListAction => {
  return {
    type: '',
    payload: {
      color: '',
      ...data.payload,
    },
    ...data,
  }
}