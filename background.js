function handleUpdated(tabId, changeInfo) {
  if (changeInfo.url) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['reinit.js'],
    });
    console.log('Tab: ' + tabId + ' URL changed to ' + changeInfo.url);
  }
}
chrome.tabs.onUpdated.addListener(handleUpdated);
