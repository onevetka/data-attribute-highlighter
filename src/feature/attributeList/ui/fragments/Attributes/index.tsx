import React, { FormEvent } from 'react';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ListSkeleton from '../../components/ListSkeleton';
import CurrentAttributeListItem from '../../components/CurrentAttributeListItem';
import { useViewModel } from '../../../state/useViewModel';

import styles from './style.module.scss';

export const Attributes: React.FC = () => {
  const {
    viewState,
    handleChangeAttributeName,
    handleHighlight,
    handleDeleteItem,
    handleToggleHighlighting,
    handlechangeHighlightColor,
  } = useViewModel();

  const renderList = () => {
    if (viewState.list === 'empty') {
      return <ListSkeleton />;
    }

    if (viewState.list === 'loading') {
      return <ListSkeleton />;
    }

    return (
      <>
        {viewState.list.map((attribute) => (
          <CurrentAttributeListItem
            viewState={attribute}
            onDelete={handleDeleteItem}
            onToggleVisibility={handleToggleHighlighting}
            onChangeColor={handlechangeHighlightColor}
            key={attribute.id}
          />
        ))}
      </>
    );
  };

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
          value={viewState.input.value}
          onChange={handleChangeAttributeName}
          placeholder="data-test"
          status={viewState.input.status}
        />
        <Button className={styles.highlightButton} type="submit">
          Highlight
        </Button>
      </form>
      <div className={styles.list}>{renderList()}</div>
    </div>
  );
};

export default Attributes;
