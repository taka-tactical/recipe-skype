"use strict";

var _electron = require("electron");

const {
  BrowserWindow
} = _electron.remote;

module.exports = (Franz, settings) => {
  const getMessages = function getMessages() {
    let directCount   = 0;
    let indirectCount = 0;

    const elements = document.querySelectorAll('[role="tablist"] > [role="tab"] > div > div > div > div[data-text-as-pseudo-element]');

    Array.prototype.forEach.call(elements, item => {
      directCount += parseInt(item.dataset.textAsPseudoElement, 10) || 0;
    });
    Franz.setBadge(directCount, indirectCount);
  };

  Franz.loop(getMessages);

  if (settings.franzVersion) {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="http"]');
      const button = event.target.closest('button[title^="http"]');

      if (link || button) {
        const url = link ? link.getAttribute('href') : button.getAttribute('title');
        event.preventDefault();
        event.stopPropagation();

        if (url.includes('views/imgpsh_fullsize_anim')) {
          let win = new BrowserWindow({
            width: 800,
            height: window.innerHeight,
            minWidth: 600,
            webPreferences: {
              partition: `persist:service-${settings.id}`
            }
          });
          win.loadURL(url);
          win.on('closed', () => {
            win = null;
          });
        } else {
          window.open(url);
        }
      }
    }, true);
  }
};
