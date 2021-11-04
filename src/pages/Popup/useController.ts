import { useState, useEffect } from 'react'
import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from '../../constants/store';
import colorGeneratorService from '../Content/modules/colorGenerator.service';


const useController = () => {
  const [currentValue, setCurrentValue] = useState('');

  const handleSave = (event: Event) => {
    event.preventDefault();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // TODO: Create constant
      const tabId = tabs[0].id || 0;

      chrome.tabs.sendMessage(tabId, { messageType: "highlight-data", attributeName: currentValue });
    });
  }

  const state = { currentValue };

  return { state, handleSave, handleInputChange: setCurrentValue }
}

export default useController