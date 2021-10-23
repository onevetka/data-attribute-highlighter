import React from 'react';
import useController from './useController';
import './Popup.css';

const Popup = () => {
  const { state, handleInputChange, handleSave } = useController();
  const { currentValue } = state;

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSave}>
          <input value={currentValue} onChange={handleInputChange} />
          <button type="submit">Save</button>
        </form>
      </header>
    </div>
  );
};

export default Popup;
