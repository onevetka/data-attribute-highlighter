// import { addTooltipToDocument } from './modules/tooltip';
import { Controller } from './modules/controller';
import { performer } from './modules/functionalCore/performer';

Controller.initHighlighters();
chrome.runtime.onMessage.addListener(performer);
