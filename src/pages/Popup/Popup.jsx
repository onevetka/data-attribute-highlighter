// Base
import React from 'react';
import { Attributes } from '../../feature/highlightedList/ui/fragments/Attributes/index'
// import useController from './useController';



// Assets
import styles from './style.module.scss';

const Popup = () => {
  // const { state, handleInputChange, handleSave } = useController();
  // const { currentValue } = state;

  return (
    <div className={styles.app}>
      <Attributes />
    </div>
  );
};

export default Popup;
