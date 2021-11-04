// Base
import { useState } from "react";

// Constants
import { STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD } from "../../constants/store";
import { HighligherData } from "../../pages/Content/modules/highlighter.service";

const useAttributeList = () => {
  const [highlightedAttributes, setHighlightedAttributes] = useState<Array<HighligherData>>([]);
  chrome.storage.local.get(STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD, (data) => {
    setHighlightedAttributes(data[STORE_CURRENT_HIGHLIGHTED_ATTRIBUTES_FIELD] || []);
  });

  const attributeList = highlightedAttributes.map((attribute, index) => {
    return ({
      id: index,
      label: attribute.attributeName,
      color: attribute.color,
      isHighlighted: true,
      onClose: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id || 0;

          chrome.tabs.sendMessage(tabId, { messageType: "remove-highlighter", id: index });
        });
      },
      onToggleVisibility: () => { },
    })
  })

  return attributeList;
}

export default useAttributeList