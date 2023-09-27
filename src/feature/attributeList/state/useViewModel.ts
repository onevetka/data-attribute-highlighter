import { attributeListReducer } from './attributeListReducer';
import { attributeListState } from './attributeListState';
import { useReducerEffector } from '../../../core/imperativeShell/hook/useReducerEffector';
import { attributeListEffector } from './attributeListEffector';
import { Color } from '../../../core/color/domain/entity/color';

export const useViewModel = () => {
  const { state, dispatch } = useReducerEffector(
    attributeListReducer,
    attributeListEffector,
    attributeListState()
  );

  // TODO: Запрос LoadUserAttributesEvent;
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
