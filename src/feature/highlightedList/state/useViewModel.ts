import { FormEvent, useReducer } from 'react';
import { attributeListReducer } from './attributeListReducer';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
// import { AttributeListAction } from './attributeListAction';
import { Status } from '../../../core/status/domain/entity/status';
import { Color } from '../../../core/color/domain/entity/color';

// export const getActions = (name: string): AttributeListAction[] => {
//   if (name.length === 0) {
//     return [
//       {
//         type: 'changeAttributeNameInputStatus',
//         payload: { status: Status.Error },
//       },
//     ];
//   }

//   return [
//     { type: 'saveNewAttribute' },
//     {
//       type: 'changeAttributeNameInputStatus',
//       payload: { status: Status.Default },
//     },
//   ];
// };

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

  const highlightAttribute = (event: FormEvent) => {
    event.preventDefault();

    dispatch({
      type: 'saveNewAttribute',
    });
  };

  const changeAttributeNameInput = (name: string) => {
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
