import { Result } from 'true-myth';
import {
  AppError,
  appError,
} from '../../../core/appError/domain/entity/appError';
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

export interface AttributeListResult {
  state: AttributeListState;
  effects: AttributeListEffect[];
}

export const attributeListReducer = (
  state: AttributeListState,
  action: AttributeListAction
): AttributeListState => {
  const newState = (() => {
    switch (action.type) {
      case 'toggleHighlighting':
        return toggleHighlighting(state, action).state;
      case 'changeHighlightColor':
        return changeHighlightColor(state, action).state;
      case 'deleteItem':
        return deleteItem(state, action).state;
      case 'changeAttributeNameInputValue':
        return changeAttributeNameInputValue(state, action).state;
      case 'saveNewAttribute':
        return saveNewAttribute(state).state;
      case 'changeAttributeNameInputStatus':
        return changeAttributeNameInputStatus(state, action).state;
      default:
        return state;
    }
  })();

  return newState;
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

export interface AttributeName {
  name: string;
}

export const attributeName = (
  data: AttributeName
): Result<AttributeName, AppError> => {
  if (data.name.length === 0) {
    return Result.err(appError({ message: 'Name is too short' }));
  }

  return Result.ok(data);
};

function saveNewAttribute(state: AttributeListState): AttributeListResult {
  const attributeNameResult = attributeName({
    name: state.attributeNameInputValue,
  });

  let effects: AttributeListEffect[] = [];
  let newState;

  if (attributeNameResult.isErr) {
    newState = {
      ...state,
      attributeNameInputValue: '',
      attributeNameInputStatus: Status.Error,
    };
  } else {
    newState = {
      ...state,
      attributeNameInputValue: '',
      attributeList: [
        attributeListItemState({
          name: state.attributeNameInputValue,
          isHighlighted: true,
          color: getRandomColor({
            knownColors: state.attributeList.map(
              (attribute) => attribute.color
            ),
          }),
        }),
        ...state.attributeList,
      ],
    };
    effects.push({
      type: 'saveAttributeToChromeStorage',
      payload: {
        text: 'Highlight new attribure',
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
