(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define([],b):'object'==typeof exports?exports.smartquotes=b():a.smartquotes=b()})(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=3)}([function(a,b,c){'use strict';var d=c(1);a.exports=function(a,b){return b=b||{},d.forEach(function(c){var d='function'==typeof c[1]?c[1](b.retainLength):c[1];a=a.replace(c[0],d)}),a}},function(a){'use strict';a.exports=[[/'''/g,function(a){return'\u2034'+(a?'\u2063\u2063':'')}],[/(\W|^)"(\w)/g,'$1\u201C$2'],[/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g,'$1\u201D$2'],[/([^0-9])"/g,'$1\u201D'],[/''/g,function(a){return'\u2033'+(a?'\u2063':'')}],[/(\W|^)'(\S)/g,'$1\u2018$2'],[/([a-z])'([a-z])/ig,'$1\u2019$2'],[/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig,'\u2019$2$3'],[/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig,'$1\u2019$3'],[/(\B|^)\u2018(?=([^\u2018\u2019]*\u2019\b)*([^\u2018\u2019]*\B\W[\u2018\u2019]\b|[^\u2018\u2019]*$))/ig,'$1\u2019'],[/"/g,'\u2033'],[/'/g,'\u2032']]},function(a,b,c){'use strict';function d(a){if(-1===['CODE','PRE','SCRIPT','STYLE'].indexOf(a.nodeName.toUpperCase())){var b,c,h,i='',j=a.childNodes,k=[];for(b=0;b<j.length;b++)c=j[b],c.nodeType===g||'#text'===c.nodeName?(k.push([c,i.length]),i+=c.nodeValue||c.value):c.childNodes&&c.childNodes.length&&(i+=d(c));for(b in i=f(i,{retainLength:!0}),k)h=k[b],h[0].nodeValue?h[0].nodeValue=e(i,h[0].nodeValue,h[1]):h[0].value&&(h[0].value=e(i,h[0].value,h[1]));return i}}function e(a,b,c){return a.substr(c,b.length).replace('\u2063','')}var f=c(0),g='undefined'!=typeof Element&&Element.TEXT_NODE||3;a.exports=function(a){return d(a),a}},function(a,b,c){'use strict';function d(a){if('undefined'!=typeof document&&'undefined'==typeof a){var b=f.bind(this,document.body);if('loading'!==document.readyState)b();else if(document.addEventListener)document.addEventListener('DOMContentLoaded',b,!1);else var c=setInterval(function(){'loading'!==document.readyState&&(clearInterval(c),b())},10);return d}return'string'==typeof a?h(a):f(a)}var e=c(1),f=c(2),g=c(4),h=c(0);a.exports=d,a.exports.string=h,a.exports.element=f,a.exports.replacements=e,a.exports.listen=g},function(a,b,c){'use strict';var d=c(2),e=c(0);a.exports=function(a){a=a||document.body;var b=new MutationObserver(function(a){a.forEach(function(a){if('childList'===a.type){var b,c=!0,f=!1;try{for(var g,h,i=a.addedNodes[Symbol.iterator]();!(c=(g=i.next()).done);c=!0)h=g.value,d(h)}catch(a){f=!0,b=a}finally{try{!c&&i.return&&i.return()}finally{if(f)throw b}}}else'characterData'===a.type&&a.target.replaceData(0,a.target.length,e(a.target.data))})});return b.observe(a,{childList:!0,characterData:!0,subtree:!0}),b}}])});
//# sourceMappingURL=smartquotes.js.map