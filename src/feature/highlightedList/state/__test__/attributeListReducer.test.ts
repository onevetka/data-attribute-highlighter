import { attributeListAction } from "../attributeListAction";
import { attributeListState } from "../attributeListState";
import { attributeListReducer } from "../attributeListReducer";

test('Should invert the highlight flag when calling the toggleHighlighting action', () => {
  expect(
    attributeListReducer(
      attributeListState(),
      attributeListAction({ type: 'toggleHighlighting'})
    )
  ).toEqual(attributeListState({ isHighlighted: true }));
});