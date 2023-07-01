import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import {
  AttributeListAction,
  ChangeAttributeNameInputStatusAction,
  ChangeAttributeNameInputValueAction,
  ChangeHighlightColorAction,
  DeleteItemAction,
  ToggleHighlightingAction,
} from './attributeListAction';
import {
  AttributeListState,
  attributeListItemState,
} from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListEffect } from './attributeListEffect';
import { AttributeName } from '../domain/entity/attributeName';
import { attribute } from '../domain/entity/attribute';
import { v4 as uuid } from 'uuid';
import { attributeStateAdapter } from './adapter/attributeStateAdapter';

export interface AttributeListResult {
  state: AttributeListState;
  effects: AttributeListEffect[];
}

export const attributeListReducer = (
  state: AttributeListState,
  action: AttributeListAction
): AttributeListResult => {
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
      case 'saveNewAttribute':
        return saveNewAttribute(state);
      case 'highlight':
        return highlight(state);
      case 'changeAttributeNameInputStatus':
        return changeAttributeNameInputStatus(state, action);
    }
  })();

  return result;
};

function toggleHighlighting(
  state: AttributeListState,
  action: ToggleHighlightingAction
): AttributeListResult {
  const id = action.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.map((attribute, index) => {
      if (index === id) {
        return attributeListItemState({
          ...attribute,
          isHighlighted: !attribute.isHighlighted,
        });
      }

      return attribute;
    }),
  };

  return { state: newState, effects: [] };
}

function changeHighlightColor(
  state: AttributeListState,
  action: ChangeHighlightColorAction
): AttributeListResult {
  const id = action.payload.id;
  const color = action.payload.color;

  const newState = {
    ...state,
    attributeList: state.attributeList.map((attribute, index) => {
      if (index === id) {
        return attributeListItemState({ ...attribute, color });
      }

      return attribute;
    }),
  };

  return { state: newState, effects: [] };
}

function deleteItem(
  state: AttributeListState,
  action: DeleteItemAction
): AttributeListResult {
  const id = action.payload.id;

  const newState = {
    ...state,
    attributeList: state.attributeList.filter((_, index) => index !== id),
  };

  return { state: newState, effects: [] };
}

function changeAttributeNameInputValue(
  state: AttributeListState,
  action: ChangeAttributeNameInputValueAction
): AttributeListResult {
  const name = action.payload.name;

  const newState = {
    ...state,
    attributeNameInputValue: name,
    attributeNameInputStatus: Status.Default,
  };

  return { state: newState, effects: [] };
}

function highlight(state: AttributeListState): AttributeListResult {
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
      state,
      effects: [
        {
          type: 'MakeAttribute',
          payload: {
            attributeName: attributeNameResult.value,
          },
        },
      ],
    };
  }
}

function saveNewAttribute(state: AttributeListState): AttributeListResult {
  const attributeNameResult = AttributeName.parse(
    state.attributeNameInputValue
  );

  let effects: AttributeListEffect[] = [];
  let newState;

  if (attributeNameResult.isErr) {
    newState = {
      ...state,
      attributeNameInputStatus: Status.Error,
    };
  } else {
    const newAttribute = attribute({
      id: '',
      name: attributeNameResult.value,
      isHighlighted: true,
      color: getRandomColor({
        knownColors: state.attributeList.map((attribute) => attribute.color),
      }),
    });

    newState = {
      ...state,
      attributeNameInputValue: '',
      attributeList: [
        attributeListItemState(attributeStateAdapter(newAttribute)),
        ...state.attributeList,
      ],
    };
    effects.push({
      type: 'saveAttributeToChromeStorage',
      payload: {
        attribute: newAttribute,
      },
    });
  }

  return { state: newState, effects };
}

function changeAttributeNameInputStatus(
  state: AttributeListState,
  action: ChangeAttributeNameInputStatusAction
): AttributeListResult {
  const newState = {
    ...state,
    attributeNameInputStatus: action.payload.status,
  };

  return { state: newState, effects: [] };
}
