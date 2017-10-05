const element = require('./element'),
      string  = require('./string');

module.exports = function(root) {
  root = root || document.body;
  const observer = new MutationObserver( mutations => {
    mutations.forEach( mutation => {
      if (mutation.type === 'childList') {
        for(let node of mutation.addedNodes) {
          element(node);
        }
      } else if (mutation.type === 'characterData') {
        mutation.target.replaceData(0, mutation.target.length, string(mutation.target.data));
      }
    });
  });
  observer.observe(root, {
    childList: true,
    characterData: true,
    subtree: true
  });
  return observer;
};
