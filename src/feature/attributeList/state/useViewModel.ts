import { useEffect, useState } from 'react';
import { reducer } from './reducer';
import { AttributeListState, attributeListState } from './attributeListState';
import { AttributeListAction } from './action';
import { effector } from './effector';
import { AttributeListEffect } from './effect';
import { HIGHLIGHTERS_FIELD } from '../../../constants/store';

export const recursion = (
  state: AttributeListState,
  effects: AttributeListEffect[]
): AttributeListState => {
  let stateToExit = state;

  for (let effect of effects) {
    const action = effector(effect);

    if (action) {
      const { state: nextState, effects } = reducer(state, action);

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
  const { state: nextState, effects } = reducer(state, action);

  return recursion(nextState, effects);
};

export const useViewModel = () => {
  const [viewModelState, setViewModelState] = useState(attributeListState());

  const sendAction = (state: AttributeListState) => {
    return (action: AttributeListAction) => {
      setViewModelState(sendActionDelta(state, action));
    };
  };

  useEffect(() => {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

      const list = Object.keys(highlightedAttributes).map((id) => {
        const { attributeName, color, isVisible } = highlightedAttributes[id];

        return {
          id,
          color,
          name: attributeName,
          isHighlighted: isVisible,
        };
      });

      setViewModelState(
        attributeListState({
          attributeList: list,
        })
      );
    });
  }, []);

  return {
    state: viewModelState,
    sendAction: sendAction(viewModelState),
  };
};
