import { useState } from 'react';
import { attributeListReducer } from './attributeListReducer';
import { AttributeListState, attributeListState } from './attributeListState';
import { AttributeListAction } from './attributeListAction';
import { effectPerformer } from './effectPerformer';
import { AttributeListEffect } from './attributeListEffect';

export const recursion = (
  state: AttributeListState,
  effects: AttributeListEffect[]
): AttributeListState => {
  let stateToExit = state;

  for (let effect of effects) {
    const action = effectPerformer(effect);

    if (action) {
      const { state: nextState, effects } = attributeListReducer(state, action);

      stateToExit = nextState;

      recursion(nextState, effects);
    }
  }

  return stateToExit;
};

export const sendActionDelta = (
  state: AttributeListState,
  action: AttributeListAction
): AttributeListState => {
  const { state: nextState, effects } = attributeListReducer(state, action);

  return recursion(nextState, effects);
};

export const useViewModel = () => {
  const [viewModelState, setViewModelState] = useState(attributeListState());

  const sendAction = (state: AttributeListState) => {
    return (action: AttributeListAction) => {
      setViewModelState(sendActionDelta(state, action));
    };
  };

  // useEffect(() => {
  //   chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
  //     const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

  //     const list = Object.keys(highlightedAttributes).map((id) => {
  //       const { attributeName, color, isVisible } = highlightedAttributes[id];

  //       return {
  //         color,
  //         name: attributeName,
  //         isHighlighted: isVisible,
  //       };
  //     });

  //     setState(
  //       attributeListState({
  //         attributeList: list,
  //       })
  //     );
  //   });
  // }, []);

  return {
    state: viewModelState,
    sendAction: sendAction(viewModelState),
  };
};
