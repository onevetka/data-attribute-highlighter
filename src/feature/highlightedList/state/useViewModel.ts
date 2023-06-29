import { useState } from 'react';
import { attributeListReducer } from './attributeListReducer';
import {
  attributeListItemState,
  attributeListState,
} from './attributeListState';
import { AttributeListAction } from './attributeListAction';

export const useViewModel = () => {
  const [state, setState] = useState(
    attributeListState({
      attributeList: [
        attributeListItemState({ name: 'hello' }),
        attributeListItemState({ name: 'world' }),
        attributeListItemState({ name: 'test' }),
      ],
    })
  );

  const sendAction = (action: AttributeListAction) => {
    const { state: newState, effects } = attributeListReducer(state, action);

    setState(newState);
    console.log('effects :>> ', effects);
  };

  return {
    state,
    sendAction,
  };
};
