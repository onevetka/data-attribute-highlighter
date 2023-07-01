import { v4 as uuid } from 'uuid';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { attributeListReducer } from './attributeListReducer';
import { Status } from '../../../core/status/domain/entity/status';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';

test('Should invert the highlight flag when calling the toggleHighlighting action', () => {
  const initialState = attributeListState({
    attributeList: [attributeListItemState()],
  });

  expect(
    attributeListReducer(initialState, {
      type: 'toggleHighlighting',
      payload: { id: 0 },
    }).state
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
    }).state
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
    }).state
  ).toEqual(attributeListState());
});

test('Action changeAttributeNameInputValue should change attribute name input value', () => {
  const state = attributeListState();

  expect(
    attributeListReducer(state, {
      type: 'changeAttributeNameInputValue',
      payload: { name: 'className' },
    }).state
  ).toEqual(attributeListState({ attributeNameInputValue: 'className' }));
});

test('Action changeAttributeNameInputValue should clear input status', () => {
  const state = attributeListState();
  const stateWithError = attributeListReducer(state, {
    type: 'changeAttributeNameInputStatus',
    payload: { status: Status.Error },
  }).state;

  expect(
    attributeListReducer(stateWithError, {
      type: 'changeAttributeNameInputValue',
      payload: { name: 'className' },
    }).state
  ).toEqual(
    attributeListState({
      attributeNameInputValue: 'className',
      attributeNameInputStatus: Status.Default,
    })
  );
});

test('Action saveNewAttribute should add new item with name and highlighted flag to list and clear attributeNameInputValue if correct name', () => {
  const initialState = attributeListState();

  const state = attributeListReducer(initialState, {
    type: 'changeAttributeNameInputValue',
    payload: { name: 'className' },
  }).state;

  expect(
    attributeListReducer(state, { type: 'saveNewAttribute' }).state
  ).toEqual(
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

test('Action saveNewAttribute should set error if name is too short', () => {
  const initialState = attributeListState();

  const state = attributeListReducer(initialState, {
    type: 'changeAttributeNameInputValue',
    payload: { name: '' },
  }).state;

  expect(
    attributeListReducer(state, { type: 'saveNewAttribute' }).state
  ).toEqual(
    attributeListState({
      attributeNameInputValue: '',
      attributeNameInputStatus: Status.Error,
    })
  );
});

test('Should set status to attributeNameInputStatus, when calling changeAttributeNameInputStatus action', () => {
  const initialState = attributeListState();

  expect(
    attributeListReducer(initialState, {
      type: 'changeAttributeNameInputStatus',
      payload: { status: Status.Error },
    }).state
  ).toEqual(attributeListState({ attributeNameInputStatus: Status.Error }));
});

test('Action highlight add item to list if name is correct and make isHighlighted flag is true', () => {
  const { state: initialState } = attributeListReducer(attributeListState(), {
    type: 'changeAttributeNameInputValue',
    payload: { name: 'className' },
  });

  const { state } = attributeListReducer(initialState, {
    type: 'highlight',
  });

  expect(state.attributeList.length).toBe(1);
  expect(state.attributeList[0].name).toBe('className');
  expect(state.attributeList[0].isHighlighted).toBe(true);
});

test('Action highlight should send effect makeAttributeRandoms if name is correct', () => {
  const { state: initialState } = attributeListReducer(attributeListState(), {
    type: 'changeAttributeNameInputValue',
    payload: { name: 'className' },
  });

  const { state, effects } = attributeListReducer(initialState, {
    type: 'highlight',
  });

  const makeAttributeEffect = effects.find(
    (effect) => effect.type === 'makeAttributeRandoms'
  );

  expect(makeAttributeEffect?.type).toBe('makeAttributeRandoms');
  expect(makeAttributeEffect?.payload.knownColors).toEqual(
    state.attributeList.map((attribute) => attribute.color)
  );
});

test('Action highlight should set error if name is too short', () => {
  const initialState = attributeListState();
  // FIXME: {}
  const state = attributeListReducer(initialState, {
    type: 'changeAttributeNameInputValue',
    payload: { name: '' },
  }).state;

  expect(attributeListReducer(state, { type: 'highlight' }).state).toEqual(
    attributeListState({
      attributeNameInputValue: '',
      attributeNameInputStatus: Status.Error,
    })
  );
});

test('Action addAttributeToList sets to list attribute', () => {
  const initialState = attributeListState();

  const { state } = attributeListReducer(initialState, {
    type: 'addAttributeToList',
    payload: {
      attribute: attributeListItemState({
        name: 'className',
        isHighlighted: true,
        color: getRandomColor({ knownColors: [] }),
      }),
    },
  });

  expect(state.attributeList).toEqual(
    attributeListState({
      attributeList: [
        attributeListItemState({
          name: 'className',
          isHighlighted: true,
          color: getRandomColor({ knownColors: [] }),
        }),
      ],
    }).attributeList
  );
});

test('Action setRandomsToAttribute sets payload to first attribute in list', () => {
  const initialState = attributeListState();

  const { state: nextState } = attributeListReducer(initialState, {
    type: 'addAttributeToList',
    payload: {
      attribute: attributeListItemState({
        name: 'className',
        isHighlighted: true,
        color: getRandomColor({ knownColors: [] }),
      }),
    },
  });

  const id = uuid();
  const color = getRandomColor({ knownColors: [] });

  const { state } = attributeListReducer(nextState, {
    type: 'setRandomsToAttribute',
    payload: {
      id,
      color,
    },
  });

  expect(state.attributeList[0].id).toBe(id);
  expect(state.attributeList[0].color).toBe(color);
});
