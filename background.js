document.addEventListener('DOMContentLoaded', () => {
  chrome.commands.onCommand.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript({'file': 'tr-d-nl.js'});
    });
  });
});
