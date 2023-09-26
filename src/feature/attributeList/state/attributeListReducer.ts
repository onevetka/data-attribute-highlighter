import {
  AddAttributeToListEvent,
  AttributeListEvent,
  ChangeAttributeNameInputStatusEvent,
  ChangeAttributeNameInputValueEvent,
  ChangeHighlightColorEvent,
  DeleteItemEvent,
  SetRandomsToAttributeEvent,
  ToggleHighlightingEvent,
} from './attributeListEvent';
import {
  AttributeListState,
  attributeListItemState,
} from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListEffect } from './attributeListEffect';
import { AttributeName } from '../domain/entity/attributeName';

export interface AttributeListReducerResult {
  state: AttributeListState;
  effects: AttributeListEffect[];
}

export const attributeListReducer = (
  state: AttributeListState,
  action: AttributeListEvent
): AttributeListReducerResult => {
  switch (action.type) {
    case 'ToggleHighlightingEvent':
      return toggleHighlighting(state, action);
    case 'ChangeHighlightColorEvent':
      return changeHighlightColor(state, action);
    case 'DeleteItemEvent':
      return deleteItem(state, action);
    case 'ChangeAttributeNameInputValueEvent':
      return changeAttributeNameInputValue(state, action);
    case 'HighlightEvent':
      return highlight(state);
    case 'AddAttributeToListEvent':
      return addAttributeToList(state, action);
    case 'SetRandomsToAttributeEvent':
      return setRandomsToAttribute(state, action);
    case 'ChangeAttributeNameInputStatusEvent':
      return changeAttributeNameInputStatus(state, action);
  }
};

function toggleHighlighting(
  state: AttributeListState,
  action: ToggleHighlightingEvent
): AttributeListReducerResult {
  const id = action.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.map((attribute) => {
      if (attribute.id === id) {
        return attributeListItemState({
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
  action: ChangeHighlightColorEvent
): AttributeListReducerResult {
  const id = action.payload.id;
  const color = action.payload.color;

  const newState = {
    ...state,
    attributeList: state.attributeList.map((attribute) => {
      if (id === attribute.id) {
        return attributeListItemState({ ...attribute, color });
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
  action: DeleteItemEvent
): AttributeListReducerResult {
  const id = action.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.filter(
      (attribute) => attribute.id !== id
    ),
  };

  return {
    state: newState,
    effects: [],
  };
}

function changeAttributeNameInputValue(
  state: AttributeListState,
  action: ChangeAttributeNameInputValueEvent
): AttributeListReducerResult {
  const name = action.payload.name;

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
    const newState: AttributeListState = {
      ...state,
      attributeNameInputValue: '',
      attributeList: [
        attributeListItemState({
          name: attributeNameResult.value.string,
          isHighlighted: true,
        }),
        ...state.attributeList,
      ],
    };

    return {
      state: newState,
      effects: [],
    };
  }
}

function addAttributeToList(
  state: AttributeListState,
  action: AddAttributeToListEvent
): AttributeListReducerResult {
  const newState = {
    ...state,
    attributeList: [
      attributeListItemState(action.payload.attribute),
      ...state.attributeList,
    ],
  };

  return { state: newState, effects: [] };
}

// FIXME: Это должен делать highlight
function changeAttributeNameInputStatus(
  state: AttributeListState,
  action: ChangeAttributeNameInputStatusEvent
): AttributeListReducerResult {
  const newState = {
    ...state,
    attributeNameInputStatus: action.payload.status,
  };

  return { state: newState, effects: [] };
}

function setRandomsToAttribute(
  state: AttributeListState,
  action: SetRandomsToAttributeEvent
): AttributeListReducerResult {
  const { id, color } = action.payload;

  const list = state.attributeList;
  const trashValue = { ...list[0] };
  const value = attributeListItemState({
    ...trashValue,
    id,
    color,
  });

  const newList = list.map((attribute, index) =>
    index === 0 ? value : attribute
  );

  const newState = {
    ...state,
    attributeList: newList,
  };

  return {
    state: newState,
    effects: [],
  };
}
