const element = require('./element'),
      string  = require('./string');

module.exports = function(root, opts) {
  if (arguments.length === 1 && typeof root === 'object' && root.constructor == Object) {
    opts = root;
    root = undefined;
  }
  root = root || document.body;
  opts = opts || {};
  const observer = new MutationObserver( mutations => {
    mutations.forEach( mutation => {
      for(let node of mutation.addedNodes) {
        element(node);
      }
    });
  });
  observer.observe(root, {
    childList: true,
    subtree: true
  });
  return observer;
};
