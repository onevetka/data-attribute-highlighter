import React from 'react';
import { Attributes } from '../../feature/highlightedList/ui/fragments/Attributes/index'
import styles from './style.module.scss';

const Popup = () => {
  return (
    <div className={styles.app}>
      <Attributes />
    </div>
  );
};

export default Popup;
