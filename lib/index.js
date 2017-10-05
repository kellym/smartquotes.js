const TEXT_NODE = typeof Element !== 'undefined' && Element.TEXT_NODE || 3;

const replacements = [
  // triple prime
  [/'''/g, retainLength => '\u2034' + (retainLength ? '\u2063\u2063' : '')],
  // beginning "
  [/(\W|^)"(\w)/g, '$1\u201c$2'],
  // ending "
  [/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2'],
  // remaining " at end of word
  [/([^0-9])"/g, '$1\u201d'],
  // double prime as two single quotes
  [/''/g, retainLength => '\u2033' + (retainLength ? '\u2063' : '')],
  // beginning '
  [/(\W|^)'(\S)/g, '$1\u2018$2'],
  // conjunction's possession
  [/([a-z])'([a-z])/ig, '$1\u2019$2'],
  // abbrev. years like '93
  [/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3'],
  // ending '
  [/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3'],
  // backwards apostrophe
  [/(\B|^)\u2018(?=([^\u2018\u2019]*\u2019\b)*([^\u2018\u2019]*\B\W[\u2018\u2019]\b|[^\u2018\u2019]*$))/ig, '$1\u2019'],
  // double prime
  [/"/g, '\u2033'],
  // prime
  [/'/g, '\u2032']
];


// The smartquotes function should just delegate to the other functions
function smartquotes(context) {
  if (typeof document !== 'undefined' && typeof context === 'undefined') {
    // if called without arguments, run on the entire body after the document has loaded
    if (document.readyState !== 'loading') {
      // we're already ready
      runOnDocument();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", run, false);
    } else {
      const readyStateCheckInterval = setInterval(() => {
        if (document.readyState !== 'loading') {
          clearInterval(readyStateCheckInterval);
          runOnDocument();
        }
      }, 10);
    }
  } else if (typeof context === 'string') {
    return string(context);
  } else {
    return element(context);
  }
}

function string(str, options) {
  options = options || {};
  replacements.forEach( replace => {
    const replacement = typeof replace[1] === 'function' ? replace[1](options.retainLength) : replace[1];
    str = str.replace(replace[0], replacement);
  });
  return str;
}

function element(root) {
  handleElement(root);
  return root;
}

function runOnDocument() {
  element(document.body);
}

function handleElement(el) {
  if (['CODE', 'PRE', 'SCRIPT', 'STYLE'].indexOf(el.nodeName.toUpperCase()) !== -1) {
    return;
  }

  let i, node, nodeInfo;
  let text = '';
  const childNodes = el.childNodes;
  const textNodes = [];

  // compile all text first so we handle working around child nodes
  for (i = 0; i < childNodes.length; i++) {
    node = childNodes[i];

    if (node.nodeType === TEXT_NODE || node.nodeName === '#text') {
      textNodes.push([node, text.length]);
      text += node.nodeValue || node.value;
    } else if (node.childNodes && node.childNodes.length) {
      text += handleElement(node);
    }

  }
  text = string(text, { retainLength: true });
  for (i in textNodes) {
    nodeInfo = textNodes[i];
    if (nodeInfo[0].nodeValue) {
      nodeInfo[0].nodeValue = substring(text, nodeInfo[0].nodeValue, nodeInfo[1]);
    } else if (nodeInfo[0].value) {
      nodeInfo[0].value = substring(text, nodeInfo[0].value, nodeInfo[1]);
    }
  }
  return text;
}

function substring(text, value, position) {
  return text.substr(position, value.length).replace('\u2063', '');
}

module.exports = smartquotes;
module.exports.string = string;
module.exports.element = element;
module.exports.replacements = replacements;
