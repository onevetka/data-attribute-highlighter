import { attributeListAction } from "../attributeListAction";
import { attributeListState } from "../attributeListState";
import { attributeListReducer } from "../attributeListreducer";

test('Should temp', () => {
  expect(attributeListReducer(attributeListState(), attributeListAction()).isHighlighted).toBe(false);
});