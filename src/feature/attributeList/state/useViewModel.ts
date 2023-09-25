import { reducer } from './reducer';
import { attributeListState } from './attributeListState';
import { useReducerEffector } from '../../../core/imperativeShell/hook/useReducerEffector';
import { effector } from './effector';
import { Color } from '../../../core/color/domain/entity/color';

export const useViewModel = () => {
  const { state, dispatch } = useReducerEffector(
    reducer,
    effector,
    attributeListState()
  );

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
      type: 'changeAttributeNameInputValue',
      payload: { name },
    });

  const handleHighlight = () =>
    dispatch({
      type: 'highlight',
    });

  const handleToggleHighlighting = (id: string) =>
    dispatch({
      type: 'toggleHighlighting',
      payload: { id },
    });

  const handlechangeHighlightColor = (id: string, color: Color) =>
    dispatch({
      type: 'changeHighlightColor',
      payload: { id, color },
    });

  const handleDeleteItem = (id: string) =>
    dispatch({
      type: 'deleteItem',
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
