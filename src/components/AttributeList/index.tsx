import React from 'react';
import cx from 'classnames';
import CurrentAttributeListItem from '../CurrentAttributeListItem';
import styles from './style.module.scss';
import useController from './useController';
import ListSkeleton from '../ListSkeleton';

const AttributeList: React.FC<any> = ({ className }) => {
  const { state } = useController();
  const { items, hasItems } = state;

  return (
    <div className={cx(styles.wrapper, className)}>
      {hasItems ? items.map((item: any) => (
        <CurrentAttributeListItem
          className={styles.listItem}
          label={item.label}
          highlightingColor={item.color}
          isHighlighted={item.isHighlighted}
          onClose={item.onClose}
          onToggleVisibility={item.onToggleVisibility}
          onChangeColor={item.onChangeColor}
          key={item.id}
        />
      )) : <ListSkeleton />}
    </div>
  )
}

export default AttributeList;

