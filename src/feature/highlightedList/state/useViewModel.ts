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

export interface SaveAttributeToChromeStoreEffectAction {
  type: 'saveAttributeToChromeStore';
  // payload: {
  //   name: string;
  // };
}

type AttributeListEffectAction = SaveAttributeToChromeStoreEffectAction;

interface EffectAction {
  action: AttributeListAction;
  effect: AttributeListEffectAction;
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
  }

  return { action, effect: { type: 'saveAttributeToChromeStore' } };
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
    const effectAction = makeEffectAction({
      type: 'saveNewAttribute',
    });

    dispatch(effectAction.action);

    console.log('effectAction :>> ', effectAction.effect);
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
