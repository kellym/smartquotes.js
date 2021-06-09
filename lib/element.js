const string = require('./string');

const TEXT_NODE = typeof Element !== 'undefined' && Element.TEXT_NODE || 3;

module.exports = function(root, ignoreClassNames) {
  handleElement(root, ignoreClassNames);
  return root;
};

const SMARTQUOTES_IGNORED_FLAG = "smartquotes-js-ignore-element-flag"

// Get the intersection of two lists in O(a+b)
const getIntersect = (a, b) => {
  return a.filter(Set.prototype.has, new Set(b));
}

const getElementClassNames = (element) => {
  return (element && element.classList && element.classList.length > 0) ? [...element.classList] : [];
}

const getHasIgnoredFlag = (element) => {
  return element && element[SMARTQUOTES_IGNORED_FLAG] === true
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
  element[SMARTQUOTES_IGNORED_FLAG] = true
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
