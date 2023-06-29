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

export const attributeListReducer = (
  state: AttributeListState,
  action: AttributeListAction
): AttributeListState => {
  switch (action.type) {
    case 'toggleHighlighting':
      return toggleHighlightingAction(state, action);
    case 'changeHighlightColor':
      return changeHighlightColor(state, action);
    case 'deleteItem':
      return deleteItem(state, action);
    case 'changeAttributeNameInputValue':
      return changeAttributeNameInputValue(state, action);
    case 'saveNewAttribute':
      return saveNewAttribute(state);
    case 'changeAttributeNameInputStatus':
      return changeAttributeNameInputStatus(state, action);
    default:
      return state;
  }
};

function toggleHighlightingAction(
  state: AttributeListState,
  action: ToggleHighlightingAction
) {
  const id = action.payload.id;

  return {
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
}

function changeHighlightColor(
  state: AttributeListState,
  action: ChangeHighlightColorAction
): AttributeListState {
  const id = action.payload.id;
  const color = action.payload.color;

  return {
    ...state,
    attributeList: state.attributeList.map((attribute, index) => {
      if (index === id) {
        return attributeListItemState({ ...attribute, color });
      }

      return attribute;
    }),
  };
}

function deleteItem(
  state: AttributeListState,
  action: DeleteItemAction
): AttributeListState {
  const id = action.payload.id;

  return {
    ...state,
    attributeList: state.attributeList.filter((_, index) => index !== id),
  };
}

function changeAttributeNameInputValue(
  state: AttributeListState,
  action: ChangeAttributeNameInputValueAction
): AttributeListState {
  const name = action.payload.name;

  return {
    ...state,
    attributeNameInputValue: name,
  };
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

  return Result.ok({
    ...data,
  });
};

function saveNewAttribute(state: AttributeListState): AttributeListState {
  const attributeNameResult = attributeName({
    name: state.attributeNameInputValue,
  });

  if (attributeNameResult.isErr) {
    return {
      ...state,
      attributeNameInputValue: '',
      attributeNameInputStatus: Status.Error,
    };
  } else {
    const newItem = attributeListItemState({
      name: attributeNameResult.value.name,
      isHighlighted: true,
      color: getRandomColor({
        knownColors: state.attributeList.map((attribute) => attribute.color),
      }),
    });

    return {
      ...state,
      attributeNameInputValue: '',
      attributeList: [newItem, ...state.attributeList],
    };
  }
}

function changeAttributeNameInputStatus(
  state: AttributeListState,
  action: ChangeAttributeNameInputStatusAction
): AttributeListState {
  return {
    ...state,
    attributeNameInputStatus: action.payload.status,
  };
}
