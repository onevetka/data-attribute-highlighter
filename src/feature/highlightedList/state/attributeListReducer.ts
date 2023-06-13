import { AttributeListAction } from "./attributeListAction";
import { AttributeListState } from "./attributeListState";

export const attributeListReducer = (state: AttributeListState, action: AttributeListAction) => {
  switch (action.type) {
    case 'toggleHighlighting':
      return state;
  }
}