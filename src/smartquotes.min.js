/*!
 * smartquotes.js v0.1.4
 * http://github.com/kellym/smartquotesjs
 * MIT licensed
 *
 * Copyright (C) 2013 Kelly Martin, http://kelly-martin.com
 */
!function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n():e.smartquotes=n()}(this,function(){function e(n){return"undefined"==typeof n?e.element(document.body):"string"==typeof n?e.string(n):n instanceof HTMLElement?e.element(n):void 0}return e.string=function(e){return e.replace(/'''/g,"‴").replace(/(\W|^)"(\S)/g,"$1“$2").replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g,"$1”$2").replace(/([^0-9])"/g,"$1”").replace(/''/g,"″").replace(/(\W|^)'(\S)/g,"$1‘$2").replace(/([a-z])'([a-z])/gi,"$1’$2").replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/gi,"$1’$3").replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/gi,"’$2$3").replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/gi,"$1’").replace(/'/g,"′")},e.element=function(n){function t(n){if(-1===["CODE","PRE","SCRIPT","STYLE"].indexOf(n.nodeName))for(var t=n.childNodes,r=0;r<t.length;r++){var a=t[r];a.nodeType===u&&(a.nodeValue=e.string(a.nodeValue))}}var u=Element.TEXT_NODE||3;t(n);for(var r=n.getElementsByTagName("*"),a=0;a<r.length;a++)t(r[a])},e});
//# sourceMappingURL=smartquotes.min.js.map