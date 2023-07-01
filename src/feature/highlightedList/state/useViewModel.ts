import { useEffect, useState } from 'react';
import { attributeListReducer } from './attributeListReducer';
import { attributeListState } from './attributeListState';
import { AttributeListAction } from './attributeListAction';
import { HIGHLIGHTERS_FIELD } from '../../../constants/store';

export const useViewModel = () => {
  const [state, setState] = useState(attributeListState());

  const sendAction = (action: AttributeListAction) => {
    const { state: newState, effects } = attributeListReducer(state, action);

    setState(newState);
    console.log('effects :>> ', effects);
  };

  useEffect(() => {
    chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
      const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

      const list = Object.keys(highlightedAttributes).map((id) => {
        const { attributeName, color, isVisible } = highlightedAttributes[id];

        return {
          color,
          name: attributeName,
          isHighlighted: isVisible,
        };
      });

      setState(
        attributeListState({
          attributeList: list,
        })
      );
    });
  }, []);

  return {
    state,
    sendAction,
  };
};
