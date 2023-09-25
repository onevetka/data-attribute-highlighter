import {
  AddAttributeToListAction,
  AttributeListAction,
  ChangeAttributeNameInputStatusAction,
  ChangeAttributeNameInputValueAction,
  ChangeHighlightColorAction,
  DeleteItemAction,
  SetRandomsToAttributeAction,
  ToggleHighlightingAction,
} from './action';
import {
  AttributeListState,
  attributeListItemState,
} from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListEffect } from './effect';
import { AttributeName } from '../domain/entity/attributeName';

export interface AttributeListReducerResult {
  state: AttributeListState;
  effects: AttributeListEffect[];
}

export const reducer = (
  state: AttributeListState,
  action: AttributeListAction
): AttributeListReducerResult => {
  switch (action.type) {
    case 'toggleHighlighting':
      return toggleHighlighting(state, action);
    case 'changeHighlightColor':
      return changeHighlightColor(state, action);
    case 'deleteItem':
      return deleteItem(state, action);
    case 'changeAttributeNameInputValue':
      return changeAttributeNameInputValue(state, action);
    case 'highlight':
      return highlight(state);
    case 'addAttributeToList':
      return addAttributeToList(state, action);
    case 'setRandomsToAttribute':
      return setRandomsToAttribute(state, action);
    case 'changeAttributeNameInputStatus':
      return changeAttributeNameInputStatus(state, action);
  }
};

function toggleHighlighting(
  state: AttributeListState,
  action: ToggleHighlightingAction
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
    effects: [
      {
        type: 'toggleAttributeInChromeStorage',
        payload: {
          id,
        },
      },
    ],
  };
}

function changeHighlightColor(
  state: AttributeListState,
  action: ChangeHighlightColorAction
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
    effects: [
      {
        type: 'changeHighlightColorInChromeStorage',
        payload: {
          id,
          color,
        },
      },
    ],
  };
}

function deleteItem(
  state: AttributeListState,
  action: DeleteItemAction
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
    effects: [
      {
        type: 'deleteAttributeFromChromeStorage',
        payload: {
          id,
        },
      },
    ],
  };
}

function changeAttributeNameInputValue(
  state: AttributeListState,
  action: ChangeAttributeNameInputValueAction
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
      effects: [
        {
          type: 'makeAttributeRandoms',
          payload: {
            knownColors: newState.attributeList.map(
              (attribute) => attribute.color
            ),
          },
        },
      ],
    };
  }
}

function addAttributeToList(
  state: AttributeListState,
  action: AddAttributeToListAction
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

function changeAttributeNameInputStatus(
  state: AttributeListState,
  action: ChangeAttributeNameInputStatusAction
): AttributeListReducerResult {
  const newState = {
    ...state,
    attributeNameInputStatus: action.payload.status,
  };

  return { state: newState, effects: [] };
}

function setRandomsToAttribute(
  state: AttributeListState,
  action: SetRandomsToAttributeAction
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
    effects: [
      {
        type: 'saveAttributeToChromeStorage',
        payload: {
          attribute: value,
        },
      },
    ],
  };
}
