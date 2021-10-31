// Base
import React from 'react';
import useController from './useController';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import CurrentAttributeListItem from '../../components/CurrentAttributeListItem';

// Assets
import styles from './style.module.scss';

const Popup = () => {
  const { state, handleInputChange, handleSave } = useController();
  const { currentValue } = state;

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <form className={styles.form} onSubmit={handleSave}>
          <Input className={styles.attributeNameInput} label="Attribute name" value={currentValue} onChange={handleInputChange} />
          <Button className={styles.highlightButton} type="submit">Highlight</Button>
        </form>
        <div className={styles.table}>
          <CurrentAttributeListItem label="data-tnav" highlightingСolor="#0670EF" onClose={() => { }} onToggleVisibility={() => { }} />

        </div>
      </header>
    </div>
  );
};

export default Popup;
