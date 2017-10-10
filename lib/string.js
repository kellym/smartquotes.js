const replacements = require('./replacements');

module.exports = function(str, options) {
  options = options || {};
  replacements.forEach( replace => {
    const replacement = typeof replace[1] === 'function' ? replace[1](options.retainLength) : replace[1];
    str = str.replace(replace[0], replacement);
  });
  return str;
};
