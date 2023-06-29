import { useReducer } from 'react';
import { attributeListReducer } from './attributeListReducer';
import {
  AttributeListState,
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { AttributeListAction } from './attributeListAction';

interface StateUpdaterAction {
  state: AttributeListState;
}

export const stateUpdater = (
  _: AttributeListState,
  action: StateUpdaterAction
): AttributeListState => {
  return action.state;
};

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

  return {
    state,
    handleAction,
  };
};
