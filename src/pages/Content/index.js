// import { addTooltipToDocument } from './modules/tooltip';
import controller from './modules/controller';

controller.initHighlighters();

// TODO: Create listentrs controller
// TODO: Add payload object like Redux

chrome.runtime.onMessage.addListener(function (request) {
  switch (request.messageType) {
    case 'saveAttributeToChromeStorage':
      controller.addHighlighter(request.payload.attributeName);
      break;
    default:
      break;
  }

  if (request.messageType === 'highlight-data') {
    controller.addHighlighter(request.attributeName);
  }

  if (request.messageType === 'remove-highlighter') {
    controller.removeHighlighter(request.id);
  }

  if (request.messageType === 'toggle-highlighter-visibility') {
    controller.toggleHighlighterVisibility(request.id);
  }

  if (request.messageType === 'change-highlighter-color') {
    controller.setHighlighterColor(request.id, request.color);
  }
});
