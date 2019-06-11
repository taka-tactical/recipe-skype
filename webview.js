"use strict";

module.exports = Franz => {
  function getMessages() {
    let directCount   = 0;
    let indirectCount = 0;

    const elements = document.querySelectorAll('[role="tablist"] > [role="tab"] > div > div > div > div[data-text-as-pseudo-element]');

    Array.prototype.forEach.call(elements, item => {
      directCount += parseInt(item.dataset.textAsPseudoElement, 10) || 0;
    });
    Franz.setBadge(directCount, indirectCount);
  };

  Franz.loop(getMessages);
};
