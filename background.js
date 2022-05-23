chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  // console.log('Page uses History API and detected tab change:', details.tabId);
  chrome.tabs.sendMessage(
    details.tabId,
    { text: 'are_you_there_content_script?' },
    function (msg) {
      msg = msg || {};
      if (msg.status !== 'yes') {
        console.log('failed to get status?');
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ['content-script.js'],
        });
      } else if (msg.status === 'yes') {
        console.log('status yes');
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ['reinit.js'],
        });
      }
    }
  );
});
