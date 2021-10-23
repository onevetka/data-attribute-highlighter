import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    /**
     * Initialize input with current value from store
     */
    chrome.storage.local.get("highlight-data-named", (data) => {
      const attributeName = data['highlight-data-named'];

      setCurrentValue(attributeName);
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set({ 'highlight-data-named': currentValue }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // TODO: Create constant
        chrome.tabs.sendMessage(tabs[0].id, { messageType: "highlight-data" });
      });
    })
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
