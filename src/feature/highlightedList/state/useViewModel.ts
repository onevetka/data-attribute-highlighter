import { useReducer } from 'react';
import { attributeListReducer } from './attributeListReducer';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { Color } from '../../../core/color/domain/entity/color';

export const useViewModel = () => {
  const [state, dispatch] = useReducer(
    attributeListReducer,
    attributeListState({
      attributeList: [
        attributeListItemState({ name: 'hello' }),
        attributeListItemState({ name: 'world' }),
        attributeListItemState({ name: 'test' }),
      ],
    })
  );

  const highlightAttribute = () => {
    dispatch({
      type: 'saveNewAttribute',
    });
  };

  const changeAttributeNameInput = (name: string) => {
    // FIXME: Это не закреплено в тестах. Убрать, вынести внутрь changeAttributeNameInputValue
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
