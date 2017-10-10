const replacements = require('./replacements'),
      element      = require('./element'),
      listen       = require('./listen'),
      string       = require('./string');


// The smartquotes function should just delegate to the other functions
function smartquotes(context) {
  if (typeof document !== 'undefined' && typeof context === 'undefined') {
    const runOnDocument = element.bind(this, document.body);
    // if called without arguments, run on the entire body after the document has loaded
    if (document.readyState !== 'loading') {
      // we're already ready
      runOnDocument();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', runOnDocument, false);
    } else {
      const readyStateCheckInterval = setInterval(() => {
        if (document.readyState !== 'loading') {
          clearInterval(readyStateCheckInterval);
          runOnDocument();
        }
      }, 10);
    }
    return smartquotes;
  } else if (typeof context === 'string') {
    return string(context);
  } else {
    return element(context);
  }
}


module.exports = smartquotes;
module.exports.string = string;
module.exports.element = element;
module.exports.replacements = replacements;
module.exports.listen = listen;
