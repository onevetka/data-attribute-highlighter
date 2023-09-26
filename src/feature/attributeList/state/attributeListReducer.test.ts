import { v4 as uuid } from 'uuid';
import 'jest-chain';
import { attributeListState } from './attributeListState';
import { attributeListReducer } from './attributeListReducer';
import { Status } from '../../../core/status/domain/entity/status';
import { RandomEnrichmentEffect } from './attributeListEffect';
import { AttributeName } from '../domain/entity/attributeName';

describe('HighlightEvent (Click Highlight button)', () => {
  describe('If data is correct', () => {
    const { state, effects } = attributeListReducer(
      attributeListState({
        attributeNameInputValue: 'data-tnav',
      }),
      {
        type: 'HighlightEvent',
      }
    );

    test('Should create the AttributeName type', () => {
      const effect = effects.find(
        (effect) => effect.type === 'RandomEnrichmentEffect'
      ) as RandomEnrichmentEffect;

      expect(effect.payload.attributeName).toBeInstanceOf(AttributeName);
      expect(effect.payload.attributeName.string).toBe('data-tnav');
    });

    test('Should requests attribute enrichment and throw known colors', () => {
      const effect = effects.find(
        (effect) => effect.type === 'RandomEnrichmentEffect'
      ) as RandomEnrichmentEffect;

      expect(effect.payload.knownColors).toEqual([]);
    });

    test('Should clear input', () => {
      expect(state.attributeNameInputValue).toBe('');
    });
  });

  describe('If data is incorrect', () => {
    const { state } = attributeListReducer(
      attributeListState({
        attributeNameInputValue: '',
      }),
      {
        type: 'HighlightEvent',
      }
    );

    test('Should show error', () => {
      expect(state.attributeNameInputStatus).toBe(Status.Error);
    });
  });
});

describe('toggleHighlighting', () => {
  const id = uuid();

  const { state } = attributeListReducer(attributeListState(), {
    type: 'ToggleHighlightingEvent',
    payload: { id },
  });

  test('Should show to user that attribute is highlighted', () => {
    const highlightedAttribute = state.attributeList.find((a) => a.id === id)!;

    expect(highlightedAttribute.isHighlighted).toBe(true);
  });

  test.skip('Should send message to core to highlight element', () => {});
});

describe('ChangeHighlightColorEvent', () => {
  const id = uuid();
  const color = '#EDEDED';

  const { state } = attributeListReducer(attributeListState(), {
    type: 'ChangeHighlightColorEvent',
    payload: { color, id },
  });

  test('Should change color', () => {
    expect(
      state.attributeList.find((attribute) => attribute.id === id)?.color
    ).toBe('#EDEDED');
  });

  test.skip('Should send message to chrome storage', () => {});
});

describe('DeleteItemEvent', () => {
  test.skip('Should send message to Chrome', () => {});
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
    const { state } = attributeListReducer(
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

    test.skip('Should send make rundoms request to effector', () => {});
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
