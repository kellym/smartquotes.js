/*!
 * smartquotes.js v0.1.4
 * http://github.com/kellym/smartquotesjs
 * MIT licensed
 *
 * Copyright (C) 2013 Kelly Martin, http://kelly-martin.com
 */

(typeof('jQuery') == 'function' ? jQuery : function ( callback ) {
  var addListener = document.addEventListener || document.attachEvent,
      removeListener = document.removeEventListener ? "removeEventListener" : "detachEvent",
      eventName = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange";

  addListener.call(document, eventName, function() {
    document[removeListener](eventName, arguments.callee, false);
    callback();
  }, false);
})(function() {
  var root = document.body;
  var node = root.childNodes[0];
  while(node != null) {
    if(node.nodeType == 3) {
      node.nodeValue = node.nodeValue
       .replace(/(\W|^)"(\S)/g, '$1\u201c$2')                                       // beginning "
       .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')          // ending "
       .replace(/([^0-9])"/g,'$1\u201d')                                            // remaining " at end of word
       .replace(/(\W|^)'(\S)/g, '$1\u2018$2')                                       // beginning '
       .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')                                  // conjunction's possession
       .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')                 // ending '
       .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')     // abbrev. years like '93
       .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
       .replace(/'''/g, '\u2034')                                                   // triple prime
       .replace(/("|'')/g, '\u2033')                                                // double prime
       .replace(/'/g, '\u2032');                                                    // prime
    }
    if(node.hasChildNodes() && node.firstChild.nodeName != "CODE") {
      node = node.firstChild;
    } else {
      do {
        while(node.nextSibling == null && node != root) {
          node = node.parentNode;
        }
        node = node.nextSibling;
      } while (node && (node.nodeName == "CODE" || node.nodeName == "SCRIPT" || node.nodeName == "STYLE"));
    }
  }
});
