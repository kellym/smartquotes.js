var jsdom = require('jsdom');
var test = require('tap').test;
var smartquotes = require('../');

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
  t.plan(3);

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: '../../smartquotes.js', // path relative to file
    onload: function (window) {
      window.smartquotes.element(window.document.body);

      var one = window.document.getElementById('one');
      t.equal(one.innerHTML, 'Ma’am, this “test” is from ’95');

      var two = window.document.getElementById('two');
      t.equal(two.innerHTML, 'Marshiness of ’Ammercloth’s');

      var three = window.document.getElementById('three');
      t.equal(three.innerHTML, 'This “text with an inner <em>emphasis</em>” should be smart, too.');

    }
  });
});

test('smartquotes()', function (t) {
  t.plan(4);

  t.equal(smartquotes('"test"'), '“test”');

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: '../../smartquotes.js', // path relative to file
    onload: function (window) {
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
