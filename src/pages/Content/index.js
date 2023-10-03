import { effector } from './modules/effector';

chrome.runtime.onMessage.addListener(effector);
