'use strict';

var fs = require('fs');
var jsdom = require('jsdom');
var test = require('tape');
var smartquotes = require('./');

test('smartquotes.string()', function (t) {
  var s = smartquotes.string;
  t.equal(s('"test"'), '“test”');
  t.equal(s('the—"test"'), 'the—“test”');
  t.equal(s('\'test\''), '‘test’');
  t.equal(s('ma\'am'), 'ma’am');
  t.equal(s('\'em'), '’em');
  t.equal(s('Marshiness of \'Ammercloth\'s'), 'Marshiness of ’Ammercloth’s');
  t.equal(s('\'95'), '’95');
  t.equal(s('\'\'\''), '‴');
  t.equal(s('\'\''), '″');

  // needs test for backwards apostrophe, but not sure when it happens

  // All synchronous, no need for t.plan()
  t.end();
});

test('smartquotes.element()', function (t) {
  t.plan(2);

  jsdom.env({
    file: 'demo/test.html',
    scripts: '../src/smartquotes.js',
    loaded: function (err, window) {
      if (err) {
        throw err;
      }

      window.smartquotes.element(window.document.body);

      var one = window.document.getElementById('one');
      t.equal(one.innerHTML, 'Ma’am, this “test” is from ’95');

      var two = window.document.getElementById('two');
      t.equal(two.innerHTML, 'Marshiness of ’Ammercloth’s');
    }
  });
});

test('smartquotes()', function (t) {
  t.plan(4);

  t.equal(smartquotes('"test"'), '“test”');

  jsdom.env({
    file: 'demo/test.html',
    scripts: '../src/smartquotes.js',
    loaded: function (err, window) {
      if (err) {
        throw err;
      }

      var one = window.document.getElementById('one');
      var two = window.document.getElementById('two');

      window.smartquotes(one);
      t.equal(one.innerHTML, 'Ma’am, this “test” is from ’95');
      t.equal(two.innerHTML, 'Marshiness of \'Ammercloth\'s');

      window.smartquotes();
      t.equal(two.innerHTML, 'Marshiness of ’Ammercloth’s');
    }
  });
});
