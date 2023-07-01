import { useState } from 'react';
import { attributeListReducer } from './attributeListReducer';
import { AttributeListState, attributeListState } from './attributeListState';
import { AttributeListAction } from './attributeListAction';
import { effectPerformer } from './effectPerformer';

export const useViewModel = () => {
  const [viewModelState, setViewModelState] = useState(attributeListState());

  const sendAction = (state: AttributeListState) => {
    return (action: AttributeListAction) => {
      const { state: newState, effects } = attributeListReducer(state, action);

      setViewModelState(newState);

      for (let effect of effects) {
        const nextAction = effectPerformer(effect);

        if (nextAction) {
          const { state: nextState } = attributeListReducer(
            newState,
            nextAction
          );
          setViewModelState(nextState);
        }
      }
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
