import {
  AttributeListEvent,
  ChangeAttributeNameInputValueEvent,
  ChangeHighlightColorEvent,
  DeleteItemEvent,
  ReceiveAttributeListEvent,
  ReceiveRandomEnrichmentEvent,
  ToggleHighlightingEvent,
} from './attributeListEvent';
import { AttributeListState } from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListEffect } from './attributeListEffect';
import { AttributeName } from '../domain/entity/attributeName';
import { Attribute } from '../domain/entity/attribute';

export interface AttributeListReducerResult {
  state: AttributeListState;
  effects: AttributeListEffect[];
}

export const attributeListReducer = (
  state: AttributeListState,
  event: AttributeListEvent
): AttributeListReducerResult => {
  switch (event.type) {
    case 'HighlightEvent':
      return highlight(state);
    case 'ReceiveRandomEnrichmentEvent':
      return receiveRandomEnrichment(state, event);
    case 'DeleteItemEvent':
      return deleteItem(state, event);
    case 'ToggleHighlightingEvent':
      return toggleHighlighting(state, event);
    case 'ChangeHighlightColorEvent':
      return changeHighlightColor(state, event);
    case 'ChangeAttributeNameInputValueEvent':
      return changeAttributeNameInputValue(state, event);
    case 'LoadAttributeListEvent':
      return loadAttributeList(state);
    case 'ReceiveAttributeListEvent':
      return receiveAttributeList(state, event);
  }
};

function toggleHighlighting(
  state: AttributeListState,
  event: ToggleHighlightingEvent
): AttributeListReducerResult {
  const id = event.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.map((attribute) => {
      if (attribute.id === id) {
        return new Attribute({
          ...attribute,
          isHighlighted: !attribute.isHighlighted,
        });
      }

      return attribute;
    }),
  };

  return {
    state: newState,
    effects: [],
  };
}

function changeHighlightColor(
  state: AttributeListState,
  event: ChangeHighlightColorEvent
): AttributeListReducerResult {
  const id = event.payload.id;
  const color = event.payload.color;

  const newState = {
    ...state,
    attributeList: state.attributeList.map((attribute) => {
      if (id === attribute.id) {
        return new Attribute({ ...attribute, color });
      }

      return attribute;
    }),
  };

  return {
    state: newState,
    effects: [],
  };
}

function deleteItem(
  state: AttributeListState,
  event: DeleteItemEvent
): AttributeListReducerResult {
  const id = event.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.filter(
      (attribute) => attribute.id !== id
    ),
  };

  return {
    state: newState,
    effects: [
      {
        type: 'SaveChangesToStorageEffect',
        payload: { changes: newState.attributeList },
      },
    ],
  };
}

function changeAttributeNameInputValue(
  state: AttributeListState,
  event: ChangeAttributeNameInputValueEvent
): AttributeListReducerResult {
  const name = event.payload.name;

  const newState = {
    ...state,
    attributeNameInputValue: name,
    attributeNameInputStatus: Status.Default,
  };

  return { state: newState, effects: [] };
}

function highlight(state: AttributeListState): AttributeListReducerResult {
  const attributeNameResult = AttributeName.parse(
    state.attributeNameInputValue
  );

  if (attributeNameResult.isErr) {
    return {
      state: {
        ...state,
        attributeNameInputStatus: Status.Error,
      },
      effects: [],
    };
  } else {
    return {
      state: {
        ...state,
        attributeNameInputValue: '',
      },
      effects: [
        {
          type: 'RandomEnrichmentEffect',
          payload: {
            attributeName: attributeNameResult.value,
            knownColors: state.attributeList.map(
              (attribute) => attribute.color
            ),
          },
        },
      ],
    };
  }
}

function receiveRandomEnrichment(
  state: AttributeListState,
  event: ReceiveRandomEnrichmentEvent
): AttributeListReducerResult {
  const { id, name, color } = event.payload;

  const attributeList = [
    new Attribute({
      id,
      name,
      color,
      isHighlighted: true,
    }),
    ...state.attributeList,
  ];

  return {
    state: {
      ...state,
      attributeNameInputValue: '',
      attributeList,
    },
    effects: [
      {
        type: 'SaveChangesToStorageEffect',
        payload: {
          changes: attributeList,
        },
      },
    ],
  };
}

function loadAttributeList(
  state: AttributeListState
): AttributeListReducerResult {
  return {
    state,
    effects: [
      {
        type: 'LoadAttributeListFromStorageEffect',
      },
    ],
  };
}

function receiveAttributeList(
  state: AttributeListState,
  event: ReceiveAttributeListEvent
): AttributeListReducerResult {
  const { attributeList } = event.payload;

  return {
    state: {
      ...state,
      attributeList,
    },
    effects: [],
  };
}
