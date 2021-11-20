import React from 'react';
import cx from 'classnames';
import CurrentAttributeListItem from '../CurrentAttributeListItem';
import styles from './style.module.scss';
import useController from './useController';

const AttributeList: React.FC<any> = ({ className }) => {
  const { state } = useController();
  const { items } = state;

  return (
    <div className={cx(styles.wrapper, className)}>
      {items.map((item: any) => (
        <CurrentAttributeListItem
          className={styles.listItem}
          label={item.label}
          highlightingColor={item.color}
          isHighlighted={item.isHighlighted}
          onClose={item.onClose}
          onToggleVisibility={item.onToggleVisibility}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default AttributeList;

