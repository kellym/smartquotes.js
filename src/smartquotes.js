(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define([],b):'object'==typeof exports?exports.smartquotes=b():a.smartquotes=b()})(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)}([function(a){'use strict';function b(a,b){return b=b||{},h.forEach(function(c){var d='function'==typeof c[1]?c[1](b.retainLength):c[1];a=a.replace(c[0],d)}),a}function c(a){return e(a),a}function d(){c(document.body)}function e(a){if(-1===['CODE','PRE','SCRIPT','STYLE'].indexOf(a.nodeName.toUpperCase())){var c,d,h,i='',j=a.childNodes,k=[];for(c=0;c<j.length;c++)d=j[c],d.nodeType===g||'#text'===d.nodeName?(k.push([d,i.length]),i+=d.nodeValue||d.value):d.childNodes&&d.childNodes.length&&(i+=e(d));for(c in i=b(i,{retainLength:!0}),k)h=k[c],h[0].nodeValue?h[0].nodeValue=f(i,h[0].nodeValue,h[1]):h[0].value&&(h[0].value=f(i,h[0].value,h[1]));return i}}function f(a,b,c){return a.substr(c,b.length).replace('\u2063','')}var g='undefined'!=typeof Element&&Element.TEXT_NODE||3,h=[[/'''/g,function(a){return'\u2034'+(a?'\u2063\u2063':'')}],[/(\W|^)"(\w)/g,'$1\u201C$2'],[/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g,'$1\u201D$2'],[/([^0-9])"/g,'$1\u201D'],[/''/g,function(a){return'\u2033'+(a?'\u2063':'')}],[/(\W|^)'(\S)/g,'$1\u2018$2'],[/([a-z])'([a-z])/ig,'$1\u2019$2'],[/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig,'\u2019$2$3'],[/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig,'$1\u2019$3'],[/(\B|^)\u2018(?=([^\u2018\u2019]*\u2019\b)*([^\u2018\u2019]*\B\W[\u2018\u2019]\b|[^\u2018\u2019]*$))/ig,'$1\u2019'],[/"/g,'\u2033'],[/'/g,'\u2032']];a.exports=function(a){if(!('undefined'!=typeof document&&'undefined'==typeof a))return'string'==typeof a?b(a):c(a);else if('loading'!==document.readyState)d();else if(document.addEventListener)document.addEventListener('DOMContentLoaded',run,!1);else var e=setInterval(function(){'loading'!==document.readyState&&(clearInterval(e),d())},10)},a.exports.string=b,a.exports.element=c,a.exports.replacements=h}])});
//# sourceMappingURL=smartquotes.js.map
