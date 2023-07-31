import { useEffect, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { reducer } from './reducer';
import { getRandomColor } from '../../../shared/color/domain/lib/getRandomColor';
import { sendChromeEffect } from '../../../chrome/lib/sendChromeEffect';
import {
  ChangeHighlightColorInChromeStorageEffect,
  DeleteAttributeFromChromeStorageEffect,
  SaveAttributeToChromeStorageEffect,
  ToggleAttributeInChromeStorageEffect,
} from './effect';
import { attributeListState } from './attributeListState';

export const useViewModel = () => {
  const [state, dispatch] = useReducer(reducer, attributeListState());
  const { effects } = state;

  useEffect(() => {
    effects.forEach((effect) => {
      switch (effect.type) {
        case 'makeAttributeRandoms':
          setTimeout(() => {
            dispatch({
              type: 'setRandomsToAttribute',
              payload: {
                id: uuid(),
                color: getRandomColor({
                  knownColors: effect.payload.knownColors,
                }),
              },
            });
          }, 5000);
          break;
        case 'saveAttributeToChromeStorage':
          sendChromeEffect<SaveAttributeToChromeStorageEffect>(effect);
          break;
        case 'changeHighlightColorInChromeStorage':
          sendChromeEffect<ChangeHighlightColorInChromeStorageEffect>(effect);
          break;
        case 'deleteAttributeFromChromeStorage':
          sendChromeEffect<DeleteAttributeFromChromeStorageEffect>(effect);
          break;
        case 'toggleAttributeInChromeStorage':
          sendChromeEffect<ToggleAttributeInChromeStorageEffect>(effect);
          break;
      }
    });
  }, [effects]);

  // useEffect(() => {
  //   chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
  //     const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

  //     const list = Object.keys(highlightedAttributes).map((id) => {
  //       const { attributeName, color, isVisible } = highlightedAttributes[id];

  //       return {
  //         id,
  //         color,
  //         name: attributeName,
  //         isHighlighted: isVisible,
  //       };
  //     });

  //     setViewModelState(
  //       attributeListState({
  //         attributeList: list,
  //       })
  //     );
  //   });
  // }, []);

  return {
    state,
    dispatch,
  };
};
