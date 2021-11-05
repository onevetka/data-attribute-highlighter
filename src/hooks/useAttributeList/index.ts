// Base
import { useState } from "react";

// Constants
import { HIGHLIGHTERS_FIELD } from "../../constants/store";
import { HighligherData } from "../../pages/Content/modules/controller";

const useAttributeList = () => {
  const [highlightedAttributes, setHighlightedAttributes] = useState<Array<HighligherData>>([]);
  chrome.storage.local.get(HIGHLIGHTERS_FIELD, (data) => {
    setHighlightedAttributes(data[HIGHLIGHTERS_FIELD] || []);
  });

  const attributeList = highlightedAttributes.map((attribute) => {
    return ({
      id: attribute.id,
      label: attribute.attributeName,
      color: attribute.color,
      isHighlighted: attribute.isVisible,
      onClose: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id || 0;

          chrome.tabs.sendMessage(tabId, { messageType: "remove-highlighter", id: attribute.id });
        });
      },
      onToggleVisibility: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id || 0;
          if (attribute.isVisible) {
            chrome.tabs.sendMessage(tabId, { messageType: "hide-highlighter", id: attribute.id });
          } else {
            chrome.tabs.sendMessage(tabId, { messageType: "show-highlighter", id: attribute.id });
          }
        });
      },
    })
  })

  return attributeList;
}

export default useAttributeList