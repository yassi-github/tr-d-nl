function updateClipboard(newClipText) {
  navigator.clipboard.writeText(newClipText).then(() => {
    return
  }, () => {
    // workaround gor writeText is not available (e.g. http site)
    const tmpTextarea = document.createElement("textarea");
    tmpTextarea.value = newClipText;
    document.body.appendChild(tmpTextarea);
    tmpTextarea.select();
    document.execCommand("copy");
    tmpTextarea.remove();
  });
}

function getSelectedText() {
  const selectedText = window.getSelection().toString();
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection#related_objects
  // > It is worth noting that currently getSelection()
  // > doesn't work on the content of <textarea> and <input> elements
  // > in Firefox and Edge (Legacy).
  if (selectedText === '') {
    const selectedElement = document.activeElement;
    switch (selectedElement.nodeName) {
      case 'TEXTAREA':
      case 'INPUT':
        return selectedElement.value.substring(selectedElement.selectionStart, selectedElement.selectionEnd);
    }
  }
  return selectedText;
}

String.prototype.formatText = function() {
  const nlRemovedText = this.trim().replace(/\n/g, ' ');
  const formatedText = nlRemovedText.replace(/ {2,}/g, ' ');
  return formatedText;
}


// main
if (document.readyState === 'complete') {
  console.log("ready");
  // if in the deepl site, ext command will paste clipboard content into focus element and hit enter key.
  if (window.location.hostname === 'www.deepl.com') {
      let inputArea = document.querySelector('div[_d-id="1"]');
      navigator.clipboard.readText().then((txt) => {
        inputArea.textContent = txt.formatText();
      }, (e) => {
        console.log(e);
      });
      // const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true });
      // document.activeElement.dispatchEvent(enterKeyEvent);
  } else {
    // else, ext command will copy text that has no newline characters.
      updateClipboard(getSelectedText().formatText());
  }
}
