const element = require('./element'),
      string  = require('./string');

function listen(root) {
  const observer = new MutationObserver( mutations => {
    mutations.forEach( mutation => {
      for(let node of mutation.addedNodes) {
        element(node);
      }
    });
  });
  listen.runOnReady( () => {
    observer.observe(root || document.body, {
      childList: true,
      subtree: true
    });
  });
  return observer;
}

listen.runOnReady = function(run) {
  // if called without arguments, run on the entire body after the document has loaded
  if (document.readyState !== 'loading') {
    // we're already ready
    run();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', run, false);
  } else {
    const readyStateCheckInterval = setInterval(() => {
      if (document.readyState !== 'loading') {
        clearInterval(readyStateCheckInterval);
        run();
      }
    }, 10);
  }
};

module.exports = listen;
