import { useReducer } from 'react';
import { attributeListReducer, stateUpdater } from './attributeListReducer';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
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

  return {
    state,
    handleAction,
  };
};
