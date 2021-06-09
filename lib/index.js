const replacements = require('./replacements'),
      element      = require('./element'),
      listen       = require('./listen'),
      string       = require('./string');


// The smartquotes function should just delegate to the other functions
function smartquotes(context, ignoreClassNames=[]) {
  if (typeof document !== 'undefined' && typeof context !== 'string' && !context) {
    listen.runOnReady(() => element(document.body, ignoreClassNames));
    return smartquotes;
  } else if (typeof context === 'string') {
    return string(context);
  } else {
    return element(context, ignoreClassNames);
  }
}


module.exports = smartquotes;
module.exports.string = string;
module.exports.element = element;
module.exports.replacements = replacements;
module.exports.listen = listen;
