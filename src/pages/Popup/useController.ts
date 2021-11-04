import { useState, useEffect } from 'react'
import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from '../../constants/store';
import colorGeneratorService from '../Content/modules/colorGenerator.service';


const useController = () => {
  const [currentValue, setCurrentValue] = useState('');

  // useEffect(() => {
  //   /**
  //    * Initialize input with current value from store
  //    */
  //   chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
  //     const attributeName = data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD];

  //     setCurrentValue(attributeName);
  //   });
  // }, []);

  const handleSave = () => {
    chrome.storage.local.set({ [STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD]: currentValue }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // TODO: Create constant
        const tabId = tabs[0].id || 0;

        chrome.tabs.sendMessage(tabId, { messageType: "highlight-data", attributeName: currentValue });
      });
    })
  }

  const state = { currentValue };

  return { state, handleSave, handleInputChange: setCurrentValue }
}

export default useController