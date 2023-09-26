import { v4 as uuid } from 'uuid';
import 'jest-chain';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { reducer } from './reducer';
import { Status } from '../../../core/status/domain/entity/status';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { MakeAttributeRandomsEffect } from './effect';

describe('toggleHighlighting', () => {
  const id = uuid();

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { state, effects } = reducer(initialState, {
    type: 'ToggleHighlightingEvent',
    payload: { id },
  });

  test('Should show to user that attribute is highlighted', () => {
    const highlightedAttribute = state.attributeList.find((a) => a.id === id)!;

    expect(highlightedAttribute.isHighlighted).toBe(true);
  });

  test('Should send message to core to highlight element', () => {
    const effect = effects.find(
      (e) => e.type === 'toggleAttributeInChromeStorage'
    );

    expect(effect).toEqual({
      type: 'toggleAttributeInChromeStorage',
      payload: { id },
    });
  });
});

describe('changeHighlightColor', () => {
  const id = uuid();
  const color = '#EDEDED';

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { state, effects } = reducer(initialState, {
    type: 'ChangeHighlightColorEvent',
    payload: { color, id },
  });

  test('Should change color', () => {
    expect(
      state.attributeList.find((attribute) => attribute.id === id)?.color
    ).toBe('#EDEDED');
  });

  test('Action changeHighlightColor should send changeHighlightColorInChromeStorage effect', () => {
    expect(effects).toEqual([
      {
        type: 'changeHighlightColorInChromeStorage',
        payload: {
          color: '#EDEDED',
          id,
        },
      },
    ]);
  });
});

describe('deleteItem', () => {
  const id = uuid();
  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { effects } = reducer(initialState, {
    type: 'DeleteItemEvent',
    payload: { id },
  });

  test('Should send message to Chrome', () => {
    expect(effects).toEqual([
      {
        type: 'deleteAttributeFromChromeStorage',
        payload: { id },
      },
    ]);
  });

  // TODO: Need to test
  test.skip('Should delete item from list', () => {});
});

describe('changeAttributeNameInputValue', () => {
  const { state } = reducer(
    attributeListState({
      attributeNameInputStatus: Status.Error,
    }),
    {
      type: 'ChangeAttributeNameInputValueEvent',
      payload: { name: 'className' },
    }
  );

  test('Should change attribute name input value', () => {
    expect(state.attributeNameInputValue).toBe('className');
  });

  test('Should clear input status', () => {
    expect(state.attributeNameInputStatus).toBe(Status.Default);
  });
});

describe('highlight', () => {
  describe('If correct data', () => {
    const { state, effects } = reducer(
      attributeListState({
        attributeNameInputValue: 'className',
      }),
      {
        type: 'HighlightEvent',
      }
    );

    test('Should add highlighted item to list', () => {
      expect(state.attributeList.length).toBe(1);
      expect(state.attributeList[0].name).toBe('className');
      expect(state.attributeList[0].isHighlighted).toBe(true);
    });

    test('Should clear input', () => {
      expect(state.attributeNameInputValue).toEqual('');
    });

    test('Should send make rundoms request to effector', () => {
      expect(effects[0].type).toBe('makeAttributeRandoms');
      expect(
        (effects[0] as MakeAttributeRandomsEffect).payload.knownColors
      ).toEqual(state.attributeList.map((attribute) => attribute.color));
    });
  });

  test('If name is too short should show error', () => {
    const { state } = reducer(
      attributeListState({
        attributeNameInputValue: '',
      }),
      { type: 'HighlightEvent' }
    );

    expect(state.attributeNameInputStatus).toBe(Status.Error);
  });
});

describe('addAttributeToList', () => {
  test('Sets to list attribute', () => {
    const initialState = attributeListState();

    const { state } = reducer(initialState, {
      type: 'AddAttributeToListEvent',
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
});
