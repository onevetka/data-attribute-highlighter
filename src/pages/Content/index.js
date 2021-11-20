// import { addTooltipToDocument } from './modules/tooltip';
import controller from './modules/controller';

controller.initHighlighters();

// TODO: Create listentrs controller
// TODO: Add payload object like Redux

chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.messageType === "highlight-data") {
      controller.addHighlighter(request.attributeName);
    }

    if (request.messageType === "remove-highlighter") {
      controller.removeHighlighter(request.id);
    }

    if (request.messageType === 'toggle-highlighter-visibility') {
      controller.toggleHighlighterVisibility(request.id)
    }
  }
);
