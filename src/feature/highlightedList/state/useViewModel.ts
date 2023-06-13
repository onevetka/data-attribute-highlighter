import { useReducer } from "react"
import { attributeListReducer } from "./attributeListReducer";
import { attributeListState } from "./attributeListState";

export const useViewModel = () => {
  const [state, dispatch] = useReducer(attributeListReducer, attributeListState());

  return {state, dispatch}
}