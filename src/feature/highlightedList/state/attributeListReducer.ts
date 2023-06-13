import { AttributeListAction } from "./attributeListAction";
import { AttributeListState } from "./attributeListState";

export const attributeListReducer = (state: AttributeListState, action: AttributeListAction): AttributeListState => {
  switch (action.type) {
    case 'toggleHighlighting':
      return {
        ...state,
        isHighlighted: !state.isHighlighted,
      };
  }
}