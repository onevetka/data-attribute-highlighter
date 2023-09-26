import { v4 as uuid } from 'uuid';
import { attributeListState } from './attributeListState';
import {
  AttributeListReducerResult,
  attributeListReducer,
} from './attributeListReducer';
import { Status } from '../../../core/status/domain/entity/status';
import { RandomEnrichmentEffect } from './attributeListEffect';
import { AttributeName, attributeName } from '../domain/entity/attributeName';
import { Attribute } from '../domain/entity/attribute';

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

describe('ReceiveRandomEnrichmentEven', () => {
  const { state } = attributeListReducer(attributeListState(), {
    type: 'ReceiveRandomEnrichmentEvent',
    payload: {
      id: uuid(),
      name: attributeName('data-tnav'),
      color: '#ededed',
    },
  });
  test('Should put Attribute type in first place of list', () => {
    expect(state.attributeList[0]).toBeInstanceOf(Attribute);
  });

  test('Should highlight new attribute', () => {
    expect(state.attributeList[0].isHighlighted).toBe(true);
  });

  test.skip('Should send effect to core', () => {});
});

describe('DeleteItemEvent (Click on delete button)', () => {
  const id = uuid();
  const receiveRandomEnrichmentEvent = {
    type: 'ReceiveRandomEnrichmentEvent',
    payload: {
      id,
      name: attributeName('data-tnav'),
      color: '#ededed',
    },
  } as const;

  const deleteItemEvent = {
    type: 'DeleteItemEvent',
    payload: {
      id,
    },
  } as const;

  const reducerInit: AttributeListReducerResult = {
    state: attributeListState(),
    effects: [],
  };

  const { state } = [receiveRandomEnrichmentEvent, deleteItemEvent].reduce(
    (accum, item) => attributeListReducer(accum.state, item),
    reducerInit
  );

  test('Should delete item from list', () => {
    expect(state.attributeList).toEqual([]);
  });
  test.skip('Should send effect to core', () => {});
});

describe('ToggleHighlightingEvent (Click on eye)', () => {
  const id = uuid();
  const receiveRandomEnrichmentEvent = {
    type: 'ReceiveRandomEnrichmentEvent',
    payload: {
      id,
      name: attributeName('data-tnav'),
      color: '#ededed',
    },
  } as const;

  const toggleHighlightingEvent = {
    type: 'ToggleHighlightingEvent',
    payload: { id },
  } as const;

  const reducerInit: AttributeListReducerResult = {
    state: attributeListState(),
    effects: [],
  };

  test('Should disables attribute', () => {
    const { state } = [
      receiveRandomEnrichmentEvent,
      toggleHighlightingEvent,
    ].reduce(
      (accum, item) => attributeListReducer(accum.state, item),
      reducerInit
    );

    const highlightedAttribute = state.attributeList.find((a) => a.id === id)!;

    expect(highlightedAttribute.isHighlighted).toBe(false);
  });

  test('Should enables attribute', () => {
    const { state } = [
      receiveRandomEnrichmentEvent,
      toggleHighlightingEvent,
      toggleHighlightingEvent,
    ].reduce(
      (accum, item) => attributeListReducer(accum.state, item),
      reducerInit
    );

    const highlightedAttribute = state.attributeList.find((a) => a.id === id)!;

    expect(highlightedAttribute.isHighlighted).toBe(true);
  });

  test.skip('Should send effect to core', () => {});
});

describe('ChangeHighlightColorEvent', () => {
  const id = uuid();
  const color = '#ededed';

  const receiveRandomEnrichmentEvent = {
    type: 'ReceiveRandomEnrichmentEvent',
    payload: {
      id,
      name: attributeName('data-tnav'),
      color: '#000000',
    },
  } as const;

  const changeHighlightColorEvent = {
    type: 'ChangeHighlightColorEvent',
    payload: { color, id },
  } as const;

  const reducerInit: AttributeListReducerResult = {
    state: attributeListState(),
    effects: [],
  };

  const { state } = [
    receiveRandomEnrichmentEvent,
    changeHighlightColorEvent,
  ].reduce(
    (accum, item) => attributeListReducer(accum.state, item),
    reducerInit
  );

  test('Should change color', () => {
    expect(
      state.attributeList.find((attribute) => attribute.id === id)?.color
    ).toBe('#ededed');
  });

  test.skip('Should send effect to core', () => {});
});
