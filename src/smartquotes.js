/*!
 * smartquotes.js v0.1.4
 * http://github.com/kellym/smartquotesjs
 * MIT licensed
 *
 * Copyright (C) 2013 Kelly Martin, http://kelly-martin.com
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.smartquotes = factory();
  }
}(this, function () {
  // The smartquotes function should just delegate to the other functions
  function smartquotes(context) {
    if (typeof context === 'undefined') {
      return smartquotes.element(document.body);
    }

    if (typeof context === 'string') {
      return smartquotes.string(context);
    }

    if (context instanceof HTMLElement) {
      return smartquotes.element(context);
    }
  }

  smartquotes.string = function smartquotesString(str) {
    return str
      .replace(/'''/g, '\u2034')                                                   // triple prime
      .replace(/(\W|^)"(\S)/g, '$1\u201c$2')                                       // beginning "
      .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')          // ending "
      .replace(/([^0-9])"/g,'$1\u201d')                                            // remaining " at end of word
      .replace(/''/g, '\u2033')                                                    // double prime
      .replace(/(\W|^)'(\S)/g, '$1\u2018$2')                                       // beginning '
      .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')                                  // conjunction's possession
      .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')                 // ending '
      .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')     // abbrev. years like '93
      .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
      .replace(/'/g, '\u2032');
  };

  smartquotes.element = function smartquotesElement(root) {
    var TEXT_NODE = Element.TEXT_NODE || 3;

    handleElement(root);

    var children = root.getElementsByTagName('*');
    for (var i = 0; i < children.length; i++) {
      handleElement(children[i]);
    }

    function handleElement(el) {
      if (['CODE', 'PRE', 'SCRIPT', 'STYLE'].indexOf(el.nodeName) !== -1) {
        return;
      }

      var childNodes = el.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        var node = childNodes[i];

        if (node.nodeType === TEXT_NODE) {
          node.nodeValue = smartquotes.string(node.nodeValue);
        }
      }
    }
  };

  return smartquotes;
}));
