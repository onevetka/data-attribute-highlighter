export const sendChromeEffect = <Effect>(effect: Effect) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id || 0;

    chrome.tabs.sendMessage(tabId, effect);
  });
};
