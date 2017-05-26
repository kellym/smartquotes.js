var jsdom = require('jsdom');
var test = require('tap').test;
var smartquotes = require('../');

test('smartquotes.string()', function (t) {
  var s = smartquotes.string;
  t.equal(s('"test"'), '\u201ctest\u201d');
  t.equal(s('the\u2014 "test"'), 'the\u2014 \u201ctest\u201d');
  t.equal(s('\'test\''), '\u2018test\u2019');
  t.equal(s('ma\'am'), 'ma\u2019am');
  t.equal(s('\'em'), '\u2019em');
  t.equal(s('Marshiness of \'Ammercloth\'s'), 'Marshiness of \u2019Ammercloth\u2019s');
  t.equal(s('\'95'), '\u201995');
  t.equal(s('\'\'\''), '\u2034');
  t.equal(s('\'\''), '\u2033');
  t.equal(s('"Better than a 6\'5" whale."'), '\u201cBetter than a 6\u20325\u2033 whale.\u201d');
  t.equal(s('"It\'s my \'#1\' choice!" - 12" Foam Finger from \'93'), '\u201cIt\u2019s my \u2018#1\u2019 choice!\u201d - 12\u2033 Foam Finger from \u201993');
  t.equal(s('"Say \'what?\'" says a Mill\'s Pet Barn employee.'), '\u201cSay \u2018what?\u2019\u201d says a Mill\u2019s Pet Barn employee.');
  t.equal(s('"Quote?": Description'), '\u201cQuote?\u201d: Description');
  t.equal(s('\'Quote?\': Description'), '\u2018Quote?\u2019: Description');

  // All synchronous, no need for t.plan()
  t.end();
});

test('smartquotes.element()', function (t) {
  t.plan(3);

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: '../../smartquotes.js', // path relative to file
    onload: function (window) {
      window.smartquotes.element(window.document.body);

      var one = window.document.getElementById('one');
      t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');

      var two = window.document.getElementById('two');
      t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');

      var three = window.document.getElementById('three');
      t.equal(three.innerHTML, '<p>\u201cThis \u2018text with an inner <em>emphasis</em>\u2019 should be smart, too.</p><p>\u201cSuper smart.\u201d</p>');
    }
  });
});

test('smartquotes()', function (t) {
  t.plan(4);

  t.equal(smartquotes('"test"'), '\u201ctest\u201d');

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: '../../smartquotes.js', // path relative to file
    onload: function (window) {
      var one = window.document.getElementById('one');
      var two = window.document.getElementById('two');

      window.smartquotes(one);
      t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
      t.equal(two.innerHTML, 'Marshiness of \'Ammercloth\'s');

      window.smartquotes();
      t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
    }
  });
});
