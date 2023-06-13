export interface AttributeListAction {
  type: 'toggleHighlighting'
}

export const attributeListAction = (data: Partial<AttributeListAction> = {}): AttributeListAction => {
  return {
    type: 'toggleHighlighting',
    ...data,
  }
}