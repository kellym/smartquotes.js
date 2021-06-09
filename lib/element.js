const string = require('./string');

const TEXT_NODE = typeof Element !== 'undefined' && Element.TEXT_NODE || 3;

module.exports = function(root, ignoreClassNames) {
  handleElement(root, ignoreClassNames);
  return root;
};

const SMARTQUOTES_ID_KEY = "smartquotes-js-id-key"

// Used to give each DOM element a unique identifier so we can
// track ignored nodes
let keyIndex = 1

// Set of node ids to ignore
const ignoredNodes = new Set();

// Get the intersection of two lists in O(a+b)
const getIntersect = (a, b) => {
  return a.filter(Set.prototype.has, new Set(b));
}

const getElementClassNames = (element) => {
  return (element && element.classList && element.classList.length > 0) ? [...element.classList] : [];
}

// Safely get (and set if it doesn't exist) the smartquotes-specific id of an element.
const setGetElementId = (element) => {
  const id = element && element[SMARTQUOTES_ID_KEY]
  if (!id && element) {
    element[SMARTQUOTES_ID_KEY] = keyIndex
    keyIndex += 1
    return element[SMARTQUOTES_ID_KEY]
  } else if (!id) {
    return null;
  } else {
    return id;
  }
}

const getHasIgnoredFlag = (element) => {
  const id = setGetElementId(element);
  if (id) {
    return ignoredNodes.has(id);
  } else {
    return false;
  }
}

const getIsIgnored = (element, ignoreClassNames) => {
  const elementClassNames = getElementClassNames(element);

  // If this node or its parent have the flag, it should be ignored
  if (getHasIgnoredFlag(element) || getHasIgnoredFlag(element.parentElement)) {
    return true;
  }

  // Find intersection of the classNames lists. If >0, then an ignored class
  // is on the element
  const intersection = getIntersect(elementClassNames, ignoreClassNames);
  return intersection.length > 0;
}

const markIgnored = (element) => {
  const id = setGetElementId(element);
  if (id) {
    ignoredNodes.add(id);
  }
  const childNodes = element.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    // recursively ignore all descendants, but disregard if they've already been visited
    if (!getHasIgnoredFlag(node)) {
      markIgnored(node);
    }
  }
}

function handleElement(el, ignoreClassNames=[]) {

  if (getIsIgnored(el, ignoreClassNames)) {
    markIgnored(el);
    return;
  }

  if (['CODE', 'PRE', 'SCRIPT', 'STYLE', 'NOSCRIPT'].indexOf(el.nodeName.toUpperCase()) !== -1) {
    return;
  }

  let i, node, nodeInfo;
  let text = '';
  const childNodes = el.childNodes;
  const textNodes = [];

  // compile all text first so we handle working around child nodes
  for (i = 0; i < childNodes.length; i++) {
    node = childNodes[i];

    if (getIsIgnored(node, ignoreClassNames)) {
      markIgnored(el);
    }

    if (node.nodeType === TEXT_NODE || node.nodeName === '#text') {
      textNodes.push([node, text.length]);
      text += node.nodeValue || node.value;
    } else if (node.childNodes && node.childNodes.length) {
      text += handleElement(node, ignoreClassNames);
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
