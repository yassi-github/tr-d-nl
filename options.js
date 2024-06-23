const commandName = 'tr-d-nl-command';
var browser = browser || chrome;

async function initCommandShortcut() {
  const commands = await browser.commands.getAll();
  for (let command of commands) {
    if (command.name === commandName) {
      document.getElementById('hotkey').value = command.shortcut;
    }
  }
}

async function updateShortcut() {
  await chrome.commands.update({
    name: commandName,
    shortcut: document.getElementById('hotkey').value
  });
}

document.addEventListener('DOMContentLoaded', initCommandShortcut);
document.getElementById('hotkey-submit').addEventListener('click', updateShortcut)
