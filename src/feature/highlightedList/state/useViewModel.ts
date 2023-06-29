import { useReducer } from 'react';
import { attributeListReducer, stateUpdater } from './attributeListReducer';
import {
  AttributeListState,
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { Status } from '../../../core/status/domain/entity/status';
import { Color } from '../../../core/color/domain/entity/color';
import { AttributeListAction } from './attributeListAction';

export const useViewModel = () => {
  const [state, dispatch] = useReducer(
    stateUpdater,
    attributeListState({
      attributeList: [
        attributeListItemState({ name: 'hello' }),
        attributeListItemState({ name: 'world' }),
        attributeListItemState({ name: 'test' }),
      ],
    })
  );

  const handleAction = (action: AttributeListAction) => {
    const newState = attributeListReducer(state, action);
    dispatch({ state: newState });
  };

  // const highlightAttribute = () => {
  //   const actions = getActions(state.attributeNameInputValue);
  //   const effectActions = actions.map(makeEffectAction);

  //   effectActions.forEach((effectAction) => {
  //     dispatch(effectAction.action);
  //     console.log(effectAction.effect);
  //   });
  // };

  // const changeAttributeNameInput = (name: string) => {
  //   // FIXME: Это не закреплено в тестах.
  //   // Убрать, вынести внутрь changeAttributeNameInputValue
  //   dispatch({
  //     type: 'changeAttributeNameInputStatus',
  //     payload: { status: Status.Default },
  //   });
  //   dispatch({
  //     type: 'changeAttributeNameInputValue',
  //     payload: { name },
  //   });
  // };

  // const removeAttribute = (index: number) => {
  //   dispatch({ type: 'deleteItem', payload: { id: index } });
  // };

  // const toggleAttributeVisibility = (index: number) => {
  //   dispatch({ type: 'toggleHighlighting', payload: { id: index } });
  // };

  // const changeAttributeColor = (index: number, color: Color) => {
  //   dispatch({
  //     type: 'changeHighlightColor',
  //     payload: { id: index, color },
  //   });
  // };

  return {
    state,
    handleAction,
    // highlightAttribute,
    // changeAttributeNameInput,
    // removeAttribute,
    // toggleAttributeVisibility,
    // changeAttributeColor,
  };
};
