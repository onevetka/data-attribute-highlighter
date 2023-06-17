import { AttributeListAction, ChangeAttributeNameInputValueAction, ChangeHighlightColorAction, DeleteItemAction, ToggleHighlightingAction } from "./attributeListAction";
import { AttributeListState, attributeListItemState } from "./attributeListState";

export const attributeListReducer = (state: AttributeListState, action: AttributeListAction): AttributeListState => {
  switch (action.type) {
    case 'toggleHighlighting':
      return toggleHighlightingAction(state, action);
    case 'changeHighlightColor':
      return changeHighlightColor(state, action);
    case 'deleteItem':
      return deleteItem(state, action);
    case 'changeAttributeNameInputValue':
      return changeAttributeNameInputValue(state, action);
    case 'saveNewAttribute':
      return saveNewAttribute(state)
    default:
      return state;
  }
}

function toggleHighlightingAction(state: AttributeListState, action: ToggleHighlightingAction) {
  const id = action.payload.id;

  return {
    ...state,
    attributeList: state.attributeList.map((attribute, index) => {
      if (index === id) {
        return attributeListItemState({ ...attribute, isHighlighted: !attribute.isHighlighted });
      }

      return attribute
    })
  }
}

function changeHighlightColor(state: AttributeListState, action: ChangeHighlightColorAction): AttributeListState {
  const id = action.payload.id;
  const color = action.payload.color;

  return {
    ...state,
    attributeList: state.attributeList.map((attribute, index) => {
      if (index === id) {
        return attributeListItemState({ ...attribute, color, })
      }
      
      return attribute;
    })
  }
}

function deleteItem(state: AttributeListState, action: DeleteItemAction): AttributeListState {
  const id = action.payload.id;

  return {
    ...state,
    attributeList: state.attributeList.filter((_, index) => index !== id)
  }
}

function changeAttributeNameInputValue(state: AttributeListState, action: ChangeAttributeNameInputValueAction): AttributeListState {
  const name = action.payload.name;

  return {
    ...state,
    attributeNameInputValue: name,
  }
}

function saveNewAttribute(state: AttributeListState): AttributeListState {
  return {
    ...state,
    attributeNameInputValue: '',
    attributeList: [
      attributeListItemState({ name: state.attributeNameInputValue, isHighlighted: true }),
      ...state.attributeList
    ]
  }
}