// import { addTooltipToDocument } from './modules/tooltip';
import controller from './modules/controller';



// TODO: Create listentrs controller
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.messageType === "highlight-data") {
      controller.addHighlighter(request.attributeName);
    }
  }
);
