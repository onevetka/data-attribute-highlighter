// Base
import { useState } from 'react';

// Constants
import { HIGHLIGHTERS_FIELD } from '../../../constants/store';

const handleRemove = (id: string) => {
  // TODO: Add dispatchChromeMessage(type, payload);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id || 0;

    chrome.tabs.sendMessage(tabId, { messageType: 'remove-highlighter', id });
  });
};

const handleToggleVisibility = (id: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id || 0;
    chrome.tabs.sendMessage(tabId, {
      messageType: 'toggle-highlighter-visibility',
      id,
    });
  });
};

const handleChangeColor = (id: string, color: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id || 0;
    chrome.tabs.sendMessage(tabId, {
      messageType: 'change-highlighter-color',
      id,
      color,
    });
  });
};

// eslint-disable-next-line no-unused-vars
const handleSave = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // TODO: Create constant
    const tabId = tabs[0].id || 0;

    chrome.tabs.sendMessage(tabId, {
      messageType: 'highlight-data',
      attributeName: 'currentValue FIXME: Это значение атрибута',
    });
  });
};

const useAttributeList = () => {
  const [attributeList, setAttributeList] = useState<Array<any>>([]);

  chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
    const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

    const list = Object.keys(highlightedAttributes).map((id) => {
      const { attributeName, color, isVisible } = highlightedAttributes[id];

      return {
        id,
        color,
        label: attributeName,
        isHighlighted: isVisible,
        onClose: () => handleRemove(id),
        onToggleVisibility: () => handleToggleVisibility(id),
        onChangeColor: (color: string) => handleChangeColor(id, color),
      };
    });

    setAttributeList(list);
  });

  return attributeList;
};

export default useAttributeList;
