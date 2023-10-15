import React, { FormEvent } from 'react';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import EmptyAttributeList from '../../components/EmptyAttributeList';
import Attribute from '../../components/Attribute';
import { useViewModel } from '../../../state/useViewModel';

import styles from './style.module.scss';
import SkeletonAttributeList from '../../components/SkeletonAttributeList';

export const AttributeList: React.FC = () => {
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
      return <EmptyAttributeList />;
    }

    if (viewState.list === 'loading') {
      return <SkeletonAttributeList />;
    }

    /**
     * TODO: Добавить обработку ошибок из кор части.
     * Так может случиться, что элементы могут быть сломаны и надо показать, что делать, чтобы это исправить
     */

    return (
      <>
        {viewState.list.map((attribute) => (
          <Attribute
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

export default AttributeList;
