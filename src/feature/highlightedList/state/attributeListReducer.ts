import { AttributeListAction, ChangeHighlightColorAction } from "./attributeListAction";
import { AttributeListState } from "./attributeListState";

export const attributeListReducer = (state: AttributeListState, action: AttributeListAction): AttributeListState => {
  switch (action.type) {
    case 'toggleHighlighting':
      return toggleHighlightingAction(state);
    case 'changeHighlightColor':
      return changeHighlightColor(state, action);
    default:
      return state;
  }
}

function toggleHighlightingAction(state: AttributeListState) {
  return {
    ...state,
    isHighlighted: !state.isHighlighted,
  }
}

function changeHighlightColor(state: AttributeListState, action: ChangeHighlightColorAction) {
  return {
    ...state,
    color: action.payload.color,
  }
}