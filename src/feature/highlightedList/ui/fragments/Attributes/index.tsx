import React, { FormEvent } from 'react';
import styles from './style.module.scss';

// Components
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ListSkeleton from '../../components/ListSkeleton';
import CurrentAttributeListItem from '../../components/CurrentAttributeListItem';

// State
import { useViewModel } from '../../../state/useViewModel';

export const Attributes: React.FC = () => {
  const {
    state,
    highlightAttribute,
    changeAttributeNameInput,
    removeAttribute,
    toggleAttributeVisibility,
    changeAttributeColor
  } = useViewModel();

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={highlightAttribute}
      >
        <Input
          className={styles.attributeNameInput}
          label="Attribute name"
          value={state.attributeNameInputValue}
          onChange={changeAttributeNameInput}
          placeholder="data-test"
        />
        <Button className={styles.highlightButton} type="submit">
          Highlight
        </Button>
      </form>
      <div className={styles.list}>
        {state.attributeList.length > 0 ? (
          state.attributeList.map((item, index) => (
            <CurrentAttributeListItem
              // FIXME: state={} Даня предлагает сразу кидать стейт, и определить его интерфейс. Посмотреть как я сделал в Озоне
              className={styles.listItem}
              label={item.name}
              highlightingColor={item.color}
              isHighlighted={item.isHighlighted}
              onClose={() => removeAttribute(index)}
              onToggleVisibility={() => toggleAttributeVisibility(index)}
              onChangeColor={(color: string) => changeAttributeColor(index, color)}
              key={index} // FIXME
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
