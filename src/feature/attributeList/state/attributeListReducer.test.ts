import { v4 as uuid } from 'uuid';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { reducer } from './reducer';
import { Status } from '../../../core/status/domain/entity/status';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { MakeAttributeRandomsEffect } from './effect';

test('Action toggleHighlighting should invert the highlight flag', () => {
  const id = uuid();

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const state = reducer(initialState, {
    type: 'toggleHighlighting',
    payload: { id },
  });

  expect(
    state.attributeList.find((attribute) => attribute.id === id)?.isHighlighted
  ).toBe(true);
});

test('Action toggleHighlighting should invert the highlight flag', () => {
  const id = uuid();

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { effects } = reducer(initialState, {
    type: 'toggleHighlighting',
    payload: { id },
  });

  expect(effects).toEqual([
    {
      type: 'toggleAttributeInChromeStorage',
      payload: { id },
    },
  ]);
});

test('Action changeHighlightColor should change color', () => {
  const id = uuid();

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const state = reducer(initialState, {
    type: 'changeHighlightColor',
    payload: { color: '#EDEDED', id },
  });

  expect(
    state.attributeList.find((attribute) => attribute.id === id)?.color
  ).toBe('#EDEDED');
});

test('Action changeHighlightColor should send changeHighlightColorInChromeStorage effect', () => {
  const id = uuid();
  const color = '#EDEDED';

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { effects } = reducer(initialState, {
    type: 'changeHighlightColor',
    payload: { color, id },
  });

  expect(effects).toEqual([
    {
      type: 'changeHighlightColorInChromeStorage',
      payload: {
        color,
        id,
      },
    },
  ]);
});

test('Actino deleteItem should delete item from list', () => {
  const id = uuid();
  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const state = reducer(initialState, {
    type: 'deleteItem',
    payload: { id },
  });

  expect(state).toEqual(
    attributeListState({
      effects: [
        {
          type: 'deleteAttributeFromChromeStorage',
          payload: { id },
        },
      ],
    })
  );
});

test('Actino deleteItem should send deleteAttributeFromChromeStorage effect', () => {
  const id = uuid();
  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { effects } = reducer(initialState, {
    type: 'deleteItem',
    payload: { id },
  });

  expect(effects).toEqual([
    {
      type: 'deleteAttributeFromChromeStorage',
      payload: { id },
    },
  ]);
});

test('Action changeAttributeNameInputValue should change attribute name input value', () => {
  const state = attributeListState();

  expect(
    reducer(state, {
      type: 'changeAttributeNameInputValue',
      payload: { name: 'className' },
    })
  ).toEqual(attributeListState({ attributeNameInputValue: 'className' }));
});

test('Action changeAttributeNameInputValue should clear input status', () => {
  const state = attributeListState();
  const stateWithError = reducer(state, {
    type: 'changeAttributeNameInputStatus',
    payload: { status: Status.Error },
  });

  expect(
    reducer(stateWithError, {
      type: 'changeAttributeNameInputValue',
      payload: { name: 'className' },
    })
  ).toEqual(
    attributeListState({
      attributeNameInputValue: 'className',
      attributeNameInputStatus: Status.Default,
    })
  );
});

test('Should set status to attributeNameInputStatus, when calling changeAttributeNameInputStatus action', () => {
  const initialState = attributeListState();

  expect(
    reducer(initialState, {
      type: 'changeAttributeNameInputStatus',
      payload: { status: Status.Error },
    })
  ).toEqual(attributeListState({ attributeNameInputStatus: Status.Error }));
});

test('Action highlight add item to list and clear input if name is correct and make isHighlighted flag is true', () => {
  const initialState = reducer(attributeListState(), {
    type: 'changeAttributeNameInputValue',
    payload: { name: 'className' },
  });

  const state = reducer(initialState, {
    type: 'highlight',
  });

  expect(state.attributeList.length).toBe(1);
  expect(state.attributeList[0].name).toBe('className');
  expect(state.attributeList[0].isHighlighted).toBe(true);
  expect(state.attributeNameInputValue).toEqual('');
});

test('Action highlight should send effect makeAttributeRandoms if name is correct', () => {
  const initialState = reducer(attributeListState(), {
    type: 'changeAttributeNameInputValue',
    payload: { name: 'className' },
  });

  const state = reducer(initialState, {
    type: 'highlight',
  });

  const { effects } = state;

  expect(effects[0].type).toBe('makeAttributeRandoms');
  expect(
    (effects[0] as MakeAttributeRandomsEffect).payload.knownColors
  ).toEqual(state.attributeList.map((attribute) => attribute.color));
});

test('Action highlight should set error if name is too short', () => {
  const initialState = attributeListState();
  // FIXME: {}
  const state = reducer(initialState, {
    type: 'changeAttributeNameInputValue',
    payload: { name: '' },
  });

  expect(reducer(state, { type: 'highlight' })).toEqual(
    attributeListState({
      attributeNameInputValue: '',
      attributeNameInputStatus: Status.Error,
    })
  );
});

test('Action addAttributeToList sets to list attribute', () => {
  const initialState = attributeListState();

  const state = reducer(initialState, {
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

  const nextState = reducer(initialState, {
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

  const state = reducer(nextState, {
    type: 'setRandomsToAttribute',
    payload: {
      id,
      color,
    },
  });

  expect(state.attributeList[0].id).toBe(id);
  expect(state.attributeList[0].color).toBe(color);
});

test('Action setRandomsToAttribute send effect saveAttributeToChromeStorage', () => {
  const initialState = attributeListState();

  const nextState = reducer(initialState, {
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

  const state = reducer(nextState, {
    type: 'setRandomsToAttribute',
    payload: {
      id,
      color,
    },
  });

  const { effects } = state;

  const saveAttributeToChromeStorageEffect = effects.find(
    (effect) => effect.type === 'saveAttributeToChromeStorage'
  );

  expect(saveAttributeToChromeStorageEffect).toEqual({
    type: 'saveAttributeToChromeStorage',
    payload: {
      attribute: state.attributeList[0],
    },
  });
});
