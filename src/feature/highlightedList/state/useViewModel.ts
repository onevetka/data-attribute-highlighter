import { useReducer } from "react"
import { attributeListReducer } from "./attributeListReducer";
import { attributeListItemState, attributeListState } from "./attributeListState";

export const useViewModel = () => {
  const [state, dispatch] = useReducer(attributeListReducer, attributeListState({ attributeList: [
    attributeListItemState({ name: 'hello'}),
    attributeListItemState({ name: 'world'}),
    attributeListItemState({ name: 'test'})
  ]}));

  return {state, dispatch}
}