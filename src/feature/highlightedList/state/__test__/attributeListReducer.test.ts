
import { attributeListItemState, attributeListState } from "../attributeListState";
import { attributeListReducer } from "../attributeListReducer";

test('Should invert the highlight flag when calling the toggleHighlighting action', () => {
  expect(
    attributeListReducer(
      attributeListState(),
      { type: 'toggleHighlighting', payload: { id: 0 }}
    )
  ).toEqual(attributeListState({ attributeList: [attributeListItemState({ isHighlighted: true })] }));
});

test('Should change color, when calling changeHighlightColor action', () => {
  expect(
    attributeListReducer(
      attributeListState(),
      { type: 'changeHighlightColor', payload: { color: '#EDEDED', id: 0 }}
    )
  ).toEqual(attributeListState({ attributeList: [attributeListItemState({ color: '#EDEDED' })]}));
});