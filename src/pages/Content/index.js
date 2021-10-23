// import { addTooltipToDocument } from './modules/tooltip';
import controller from './modules/controller';

controller.startHighlighter();

// TODO: Create listentrs controller
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.messageType === "highlight-data") {
      controller.startHighlighter();
    }
  }
);
