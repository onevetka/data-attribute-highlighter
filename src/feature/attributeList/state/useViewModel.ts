import { attributeListReducer } from './attributeListReducer';
import { attributeListState } from './attributeListState';
import { useReducerEffector } from '../../../core/imperativeShell/hook/useReducerEffector';
import { attributeListEffector } from './attributeListEffector';
import { Color } from '../../../core/color/domain/entity/color';
import { useEffect } from 'react';

export const useViewModel = () => {
  const { state, dispatch } = useReducerEffector(
    attributeListReducer,
    attributeListEffector,
    attributeListState()
  );

  useEffect(() => {
    dispatch({
      type: 'LoadAttributeListEvent',
    });
  }, []);

  const handleChangeAttributeNameInputValue = (name: string) =>
    dispatch({
      type: 'ChangeAttributeNameInputValueEvent',
      payload: { name },
    });

  const handleHighlight = () =>
    dispatch({
      type: 'HighlightEvent',
    });

  const handleToggleHighlighting = (id: string) =>
    dispatch({
      type: 'ToggleHighlightingEvent',
      payload: { id },
    });

  const handlechangeHighlightColor = (id: string, color: Color) =>
    dispatch({
      type: 'ChangeHighlightColorEvent',
      payload: { id, color },
    });

  const handleDeleteItem = (id: string) =>
    dispatch({
      type: 'DeleteItemEvent',
      payload: { id },
    });

  return {
    viewState: state,
    handleChangeAttributeNameInputValue,
    handleHighlight,
    handleToggleHighlighting,
    handlechangeHighlightColor,
    handleDeleteItem,
  };
};
