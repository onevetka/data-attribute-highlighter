import React, { FormEvent } from 'react';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ListSkeleton from '../../components/ListSkeleton';
import CurrentAttributeListItem from '../../components/CurrentAttributeListItem';
import { Color } from '../../../../../core/color/domain/entity/color';
import { useViewModel } from '../../../state/useViewModel';

import styles from './style.module.scss';

export const Attributes: React.FC = () => {
  const {
    viewState,
    handleChangeAttributeNameInputValue,
    handleHighlight,
    handleToggleHighlighting,
    handlechangeHighlightColor,
    handleDeleteItem,
  } = useViewModel();

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          handleHighlight();
        }}
      >
        <Input
          className={styles.attributeNameInput}
          label="Attribute name"
          value={viewState.attributeNameInputValue}
          onChange={handleChangeAttributeNameInputValue}
          placeholder="data-test"
          status={viewState.attributeNameInputStatus}
        />
        <Button className={styles.highlightButton} type="submit">
          Highlight
        </Button>
      </form>
      <div className={styles.list}>
        {viewState.attributeList.length > 0 ? (
          viewState.attributeList.map((attribute, index) => (
            <CurrentAttributeListItem
              className={styles.listItem}
              label={attribute.name.string}
              highlightingColor={attribute.color}
              isHighlighted={attribute.isHighlighted}
              onClose={() => handleDeleteItem(attribute.id)}
              onToggleVisibility={() => handleToggleHighlighting(attribute.id)}
              onChangeColor={(color: Color) =>
                handlechangeHighlightColor(attribute.id, color)
              }
              key={attribute.id}
            />
          ))
        ) : (
          <ListSkeleton />
        )}
      </div>
    </div>
  );
};

export default Attributes;
