var jsdom = require('jsdom');
var test = require('tap').test;
var parse5 = require('parse5');
var smartquotes = require('../');

test('smartquotes.string()', t => {

  // a list of test strings and expected converted values
  var expectations = {
    '"test"': '\u201ctest\u201d',
    'the\u2014 "test"': 'the\u2014 \u201ctest\u201d',
    '\'test\'': '\u2018test\u2019',
    'ma\'am': 'ma\u2019am',
    '\'em': '\u2019em',
    'Marshiness of \'Ammercloth\'s': 'Marshiness of \u2019Ammercloth\u2019s',
    '\'95': '\u201995',
    '\'\'\'': '\u2034',
    '\'\'': '\u2033',
    '"Better than a 6\'5" whale."': '\u201cBetter than a 6\u20325\u2033 whale.\u201d',
    '"It\'s my \'#1\' choice!" - 12" Foam Finger from \'93': '\u201cIt\u2019s my \u2018#1\u2019 choice!\u201d - 12\u2033 Foam Finger from \u201993',
    '"Say \'what?\'" says a Mill\'s Pet Barn employee.': '\u201cSay \u2018what?\u2019\u201d says a Mill\u2019s Pet Barn employee.',
    '"Quote?": Description': '\u201cQuote?\u201d: Description',
    '\'Quo Te?\': Description': '\u2018Quo Te?\u2019: Description',
    '"De Poesjes van Kevin?": Something, something': '\u201cDe Poesjes van Kevin?\u201d: Something, something',
    'And then she blurted, "I thought you said, \'I don\'t like \'80s music\'?"': "And then she blurted, \u201cI thought you said, \u2018I don\u2019t like \u201980s music\u2019?\u201d"
  };

  Object.keys(expectations).forEach( string => {
    t.equal(smartquotes.string(string), expectations[string]);
  });

  t.end();

});

test('smartquotes.element()', t => {

  test('supports parse5 parsing for server-side usage', t => {
    var document = parse5.parse('"test text"');
    smartquotes.element(document);
    t.match(parse5.serialize(document), /\u201ctest text\u201d/);
    t.end();
  });

  jsdom.env({
    html: '',
    onload: (window) => {
      test('respects custom processString behavior', t => {
        var node = window.document.createElement('div');
        node.innerHTML = '<div><div class="some--class">hello - world</div><div>goodbye -- cruel</div><div>bleah --- thing</div></div>';
        smartquotes.element(node, {
          processString: (str) => str.replace(/\-\-/g, '\u2014')
        });
        t.match(node.innerHTML, '<div><div class="some--class">hello - world</div><div>goodbye \u2014 cruel</div><div>bleah \u2014- thing</div></div>');

        t.end();
      });
    }
  });

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: '../../smartquotes.js', // path relative to file
    onload: function (window) {
      window.smartquotes.element(window.document.body);

      test('converting basic types of quotes to smart quotes', t => {
        var one = window.document.getElementById('one');
        var two = window.document.getElementById('two');
        t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
        t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
        t.end();
      });

      test('handling tags inside tags', t => {
        var three = window.document.getElementById('three');
        t.equal(three.innerHTML, '<p>\u201cThis \u2018text with an inner <em>emphasis</em>\u2019 should be smart, too.</p><p>\u201cSuper smart.\u201d</p>');
        t.end();
      });

      test('retaining proper substrings inside tag', t => {
        var four = window.document.getElementById('four');
        t.match(four.innerHTML, 'Maar Mees');
        t.end();
      });

      test('does not alter script tags', t => {
        var script = window.document.getElementsByTagName('SCRIPT')[0];
        t.match(script.innerHTML, 'unchanged = "text"');
        t.end();
      });

      t.end();
    }
  });
});

test('smartquotes()', t => {

  test('detects and converts strings', t => {
    t.equal(smartquotes('"test"'), '\u201ctest\u201d');
    t.end();
  });

  test('detects and converts html documents', t => {
    jsdom.env({
      file: './test/fixtures/basic.html',
      scripts: '../../smartquotes.js', // path relative to file
      onload: function (window) {
        var one = window.document.getElementById('one');
        var two = window.document.getElementById('two');

        test('converts individual elements if passed as an argument', t => {
          window.smartquotes(one);
          t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
          t.equal(two.innerHTML, 'Marshiness of \'Ammercloth\'s');
          t.end();
        });

        test('converts entire document if no argument is passed', t => {
          window.smartquotes();
          t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
          t.end();
        });

        t.end();
      }
    });
  });

  t.end();
});
