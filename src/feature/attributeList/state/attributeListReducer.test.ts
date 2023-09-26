import { v4 as uuid } from 'uuid';
import 'jest-chain';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { attributeListReducer } from './attributeListReducer';
import { Status } from '../../../core/status/domain/entity/status';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { MakeAttributeRandomsEffect } from './attributeListEffect';

describe('toggleHighlighting', () => {
  const id = uuid();

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { state, effects } = attributeListReducer(initialState, {
    type: 'ToggleHighlightingEvent',
    payload: { id },
  });

  test('Should show to user that attribute is highlighted', () => {
    const highlightedAttribute = state.attributeList.find((a) => a.id === id)!;

    expect(highlightedAttribute.isHighlighted).toBe(true);
  });

  test('Should send message to core to highlight element', () => {
    const effect = effects.find(
      (e) => e.type === 'ToggleAttributeInChromeStorageEffect'
    );

    expect(effect).toEqual({
      type: 'ToggleAttributeInChromeStorageEffect',
      payload: { id },
    });
  });
});

describe('ChangeHighlightColorEvent', () => {
  const id = uuid();
  const color = '#EDEDED';

  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { state, effects } = attributeListReducer(initialState, {
    type: 'ChangeHighlightColorEvent',
    payload: { color, id },
  });

  test('Should change color', () => {
    expect(
      state.attributeList.find((attribute) => attribute.id === id)?.color
    ).toBe('#EDEDED');
  });

  test('Should send message to chrome storage', () => {
    expect(effects).toEqual([
      {
        type: 'ChangeHighlightColorInChromeStorageEffect',
        payload: {
          color: '#EDEDED',
          id,
        },
      },
    ]);
  });
});

describe('DeleteItemEvent', () => {
  const id = uuid();
  const initialState = attributeListState({
    attributeList: [
      attributeListItemState({
        id,
      }),
    ],
  });

  const { effects } = attributeListReducer(initialState, {
    type: 'DeleteItemEvent',
    payload: { id },
  });

  test('Should send message to Chrome', () => {
    expect(effects).toEqual([
      {
        type: 'DeleteAttributeFromChromeStorageEffect',
        payload: { id },
      },
    ]);
  });

  // TODO: Need to test
  test.skip('Should delete item from list', () => {});
});

describe('ChangeAttributeNameInputValueEvent', () => {
  const { state } = attributeListReducer(
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

describe('HighlightEvent', () => {
  describe('If correct data', () => {
    const { state, effects } = attributeListReducer(
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
      expect(effects[0].type).toBe('MakeAttributeRandomsEffect');
      expect(
        (effects[0] as MakeAttributeRandomsEffect).payload.knownColors
      ).toEqual(state.attributeList.map((attribute) => attribute.color));
    });
  });

  test('If name is too short should show error', () => {
    const { state } = attributeListReducer(
      attributeListState({
        attributeNameInputValue: '',
      }),
      { type: 'HighlightEvent' }
    );

    expect(state.attributeNameInputStatus).toBe(Status.Error);
  });
});

describe('AddAttributeToListEvent', () => {
  test('Sets to list attribute', () => {
    const initialState = attributeListState();

    const { state } = attributeListReducer(initialState, {
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
