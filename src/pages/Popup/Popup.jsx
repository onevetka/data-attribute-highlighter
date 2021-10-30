// Base
import React from 'react';
import useController from './useController';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Assets
import './Popup.css';

const Popup = () => {
  const { state, handleInputChange, handleSave } = useController();
  const { currentValue } = state;

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSave}>
          <Input label="Attribute name" value={currentValue} onChange={handleInputChange} />
          <Button type="submit">Highlight</Button>
        </form>
      </header>
    </div>
  );
};

export default Popup;
