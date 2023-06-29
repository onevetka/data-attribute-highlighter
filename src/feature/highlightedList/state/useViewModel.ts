import { useReducer } from 'react';
import { attributeListReducer } from './attributeListReducer';
import {
  AttributeListState,
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { Color } from '../../../core/color/domain/entity/color';
import { AttributeListAction } from './attributeListAction';

export const getActions = (name: string): AttributeListAction[] => {
  if (name.length === 0) {
    return [
      {
        type: 'changeAttributeNameInputStatus',
        payload: { status: Status.Error },
      },
    ];
  }

  return [
    { type: 'saveNewAttribute' },
    {
      type: 'changeAttributeNameInputStatus',
      payload: { status: Status.Default },
    },
  ];
};

export interface SaveAttributeToChromeStoreEffectAction {
  type: 'saveAttributeToChromeStore';
  // payload: {
  //   name: string;
  // };
}

type AttributeListEffectAction = SaveAttributeToChromeStoreEffectAction;

interface EffectAction {
  action: AttributeListAction;
  effect: AttributeListEffectAction | undefined;
}

const makeEffectAction = (action: AttributeListAction): EffectAction => {
  switch (action.type) {
    case 'saveNewAttribute':
      return {
        action,
        effect: {
          type: 'saveAttributeToChromeStore',
        },
      };
    default:
      return {
        action,
        effect: undefined,
      };
  }
};

const initAttributeListState = (state: AttributeListState) => {
  return {
    ...state,
    attributeList: [
      attributeListItemState({ name: 'hello' }),
      attributeListItemState({ name: 'world' }),
      attributeListItemState({ name: 'test' }),
    ],
  };
};

export const useViewModel = () => {
  const [state, dispatch] = useReducer(
    attributeListReducer,
    attributeListState(),
    initAttributeListState
  );

  const highlightAttribute = () => {
    const actions = getActions(state.attributeNameInputValue);
    const effectActions = actions.map(makeEffectAction);

    effectActions.forEach((effectAction) => {
      dispatch(effectAction.action);
      console.log(effectAction.effect);
    });
  };

  const changeAttributeNameInput = (name: string) => {
    // FIXME: Это не закреплено в тестах.
    // Убрать, вынести внутрь changeAttributeNameInputValue
    dispatch({
      type: 'changeAttributeNameInputStatus',
      payload: { status: Status.Default },
    });
    dispatch({
      type: 'changeAttributeNameInputValue',
      payload: { name },
    });
  };

  const removeAttribute = (index: number) => {
    dispatch({ type: 'deleteItem', payload: { id: index } });
  };

  const toggleAttributeVisibility = (index: number) => {
    dispatch({ type: 'toggleHighlighting', payload: { id: index } });
  };

  const changeAttributeColor = (index: number, color: Color) => {
    dispatch({
      type: 'changeHighlightColor',
      payload: { id: index, color },
    });
  };

  return {
    state,
    highlightAttribute,
    changeAttributeNameInput,
    removeAttribute,
    toggleAttributeVisibility,
    changeAttributeColor,
  };
};
