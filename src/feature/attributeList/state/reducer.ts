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
import {
  ChangeHighlightColorInChromeStorageEffect,
  DeleteAttributeFromChromeStorageEffect,
  MakeAttributeRandomsEffect,
  SaveAttributeToChromeStorageEffect,
  ToggleAttributeInChromeStorageEffect,
} from './effect';
import { AttributeName } from '../domain/entity/attributeName';

export const reducer = (
  state: AttributeListState,
  action: AttributeListAction
): AttributeListState => {
  const result = (() => {
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
  })();

  return result;
};

function toggleHighlighting(
  state: AttributeListState,
  action: ToggleHighlightingAction
): AttributeListState {
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
    effects: [
      ...state.effects,
      {
        type: 'toggleAttributeInChromeStorage',
        payload: {
          id,
        },
      } as ToggleAttributeInChromeStorageEffect,
    ],
  };

  return newState;
}

function changeHighlightColor(
  state: AttributeListState,
  action: ChangeHighlightColorAction
): AttributeListState {
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
    effects: [
      ...state.effects,
      {
        type: 'changeHighlightColorInChromeStorage',
        payload: {
          id,
          color,
        },
      } as ChangeHighlightColorInChromeStorageEffect,
    ],
  };

  return newState;
}

function deleteItem(
  state: AttributeListState,
  action: DeleteItemAction
): AttributeListState {
  const id = action.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.filter(
      (attribute) => attribute.id !== id
    ),
    effects: [
      ...state.effects,
      {
        type: 'deleteAttributeFromChromeStorage',
        payload: {
          id,
        },
      } as DeleteAttributeFromChromeStorageEffect,
    ],
  };

  return newState;
}

function changeAttributeNameInputValue(
  state: AttributeListState,
  action: ChangeAttributeNameInputValueAction
): AttributeListState {
  const name = action.payload.name;

  const newState = {
    ...state,
    attributeNameInputValue: name,
    attributeNameInputStatus: Status.Default,
  };

  return newState;
}

function highlight(state: AttributeListState): AttributeListState {
  const attributeNameResult = AttributeName.parse(
    state.attributeNameInputValue
  );

  if (attributeNameResult.isErr) {
    return {
      ...state,
      attributeNameInputStatus: Status.Error,
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

    const effects = [
      ...newState.effects,
      {
        type: 'makeAttributeRandoms',
        payload: {
          knownColors: newState.attributeList.map(
            (attribute) => attribute.color
          ),
        },
      } as MakeAttributeRandomsEffect,
    ];

    return {
      ...newState,
      effects,
    };
  }
}

function addAttributeToList(
  state: AttributeListState,
  action: AddAttributeToListAction
): AttributeListState {
  const newState = {
    ...state,
    attributeList: [
      attributeListItemState(action.payload.attribute),
      ...state.attributeList,
    ],
  };

  return newState;
}

function changeAttributeNameInputStatus(
  state: AttributeListState,
  action: ChangeAttributeNameInputStatusAction
): AttributeListState {
  const newState = {
    ...state,
    attributeNameInputStatus: action.payload.status,
  };

  return newState;
}

function setRandomsToAttribute(
  state: AttributeListState,
  action: SetRandomsToAttributeAction
): AttributeListState {
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
    effects: [
      ...state.effects,
      {
        type: 'saveAttributeToChromeStorage',
        payload: {
          attribute: value,
        },
      } as SaveAttributeToChromeStorageEffect,
    ],
  };

  return newState;
}
