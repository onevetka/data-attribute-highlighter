import {
  attributeListItemState,
  attributeListState,
} from '../attributeListState';
import { attributeListReducer } from '../attributeListReducer';
import { Status } from '../../../../core/status/domain/entity/status';
import { getRandomColor } from '../../../../shared/color/domain/lib/getRandomColor';

test('Should invert the highlight flag when calling the toggleHighlighting action', () => {
  const initialState = attributeListState({
    attributeList: [attributeListItemState()],
  });

  expect(
    attributeListReducer(initialState, {
      type: 'toggleHighlighting',
      payload: { id: 0 },
    })
  ).toEqual(
    attributeListState({
      attributeList: [attributeListItemState({ isHighlighted: true })],
    })
  );
});

test('Should change color, when calling changeHighlightColor action', () => {
  const initialState = attributeListState({
    attributeList: [attributeListItemState()],
  });

  expect(
    attributeListReducer(initialState, {
      type: 'changeHighlightColor',
      payload: { color: '#EDEDED', id: 0 },
    })
  ).toEqual(
    attributeListState({
      attributeList: [attributeListItemState({ color: '#EDEDED' })],
    })
  );
});

test('Should delete item from list, when calling deleteItem action', () => {
  const initialState = attributeListState({
    attributeList: [attributeListItemState()],
  });

  expect(
    attributeListReducer(initialState, {
      type: 'deleteItem',
      payload: { id: 0 },
    })
  ).toEqual(attributeListState());
});

test('Should change attribute name input value, when calling changeAttributeNameInputValue action', () => {
  const initialState = attributeListState();

  expect(
    attributeListReducer(initialState, {
      type: 'changeAttributeNameInputValue',
      payload: { name: 'className' },
    })
  ).toEqual(attributeListState({ attributeNameInputValue: 'className' }));
});

test('Should add new item with name and highlighted flag to list and clear attributeNameInputValue, when calling saveNewAttribute action', () => {
  const initialState = attributeListState();

  const state = attributeListReducer(initialState, {
    type: 'changeAttributeNameInputValue',
    payload: { name: 'className' },
  });

  expect(attributeListReducer(state, { type: 'saveNewAttribute' })).toEqual(
    attributeListState({
      attributeNameInputValue: '',
      attributeList: [
        attributeListItemState({
          name: 'className',
          isHighlighted: true,
          color: getRandomColor({ knownColors: [] }),
        }),
      ],
    })
  );
});

test('Should set status to attributeNameInputStatus, when calling changeAttributeNameInputStatus action', () => {
  const initialState = attributeListState();

  expect(
    attributeListReducer(initialState, {
      type: 'changeAttributeNameInputStatus',
      payload: { status: Status.Error },
    })
  ).toEqual(attributeListState({ attributeNameInputStatus: Status.Error }));
});
