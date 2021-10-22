import React, { useState } from 'react';
import Controller from '../Content/modules/controller';
import './Popup.css';

const Popup = () => {
  const [currentValue, setCurrentValue] = useState('');

  const handleSave = () => {
    chrome.storage.local.set({'highlight-data-named': currentValue}, function() {
      Controller.startHighlighter();
    });
  }

  const handleInputChange = (event) => {
    setCurrentValue(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input value={currentValue} onChange={handleInputChange} />
        <button onClick={handleSave}>Save</button>
      </header>
    </div>
  );
};

export default Popup;
