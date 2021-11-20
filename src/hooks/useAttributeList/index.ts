// Base
import { useState, useEffect } from "react";

// Constants
import { HIGHLIGHTERS_FIELD } from "../../constants/store";

const handleRemoveHighlighter = (id: string) => {
  // TODO: Add dispatchChromeMessage(type, payload);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id || 0;

    chrome.tabs.sendMessage(tabId, { messageType: "remove-highlighter", id });
  });
}

const handleToggleHighlighterVisibility = (id: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id || 0;
    chrome.tabs.sendMessage(tabId, { messageType: "toggle-highlighter-visibility", id });
  });
}

const useAttributeList = () => {
  const [attributeList, setAttributeList] = useState<Array<any>>([]);

  const handleToggleVisibility = (id: string) => {
    handleToggleHighlighterVisibility(id);
  };

  const handleRemove = (id: string) => {
    handleRemoveHighlighter(id);
  }

  chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
    const highlightedAttributes = data[HIGHLIGHTERS_FIELD] || [];

    const list = Object.keys(highlightedAttributes).map((id) => {
      const {attributeName, color, isVisible} = highlightedAttributes[id];
  
      return ({
        id,
        color,
        label: attributeName,
        isHighlighted: isVisible,
        onClose: () => handleRemove(id),
        onToggleVisibility: () => handleToggleVisibility(id),
      });
    });

    setAttributeList(list);
  });

  return attributeList;
}

export default useAttributeList