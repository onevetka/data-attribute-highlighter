// Base
import { useState } from "react";

// Constants
import { HIGHLIGHTERS_FIELD } from "../../constants/store";
import { HighlighterData } from "../../pages/Content/modules/controller";

const useAttributeList = () => {
  const [highlightedAttributes, setHighlightedAttributes] = useState<Record<string, HighlighterData>>({});

  chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
    setHighlightedAttributes(data[HIGHLIGHTERS_FIELD] || []);
  });

  const attributeList = Object.keys(highlightedAttributes).map((id) => {
    const {attributeName, color, isVisible} = highlightedAttributes[id];

    return ({
      id,
      color,
      label: attributeName,
      isHighlighted: isVisible,
      onClose: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id || 0;

          chrome.tabs.sendMessage(tabId, { messageType: "remove-highlighter", id });
        });
      },
      onToggleVisibility: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id || 0;
          chrome.tabs.sendMessage(tabId, { messageType: "toggle-highlighter-visibility", id });
        });
      },
    });
  });

  return attributeList;
}

export default useAttributeList