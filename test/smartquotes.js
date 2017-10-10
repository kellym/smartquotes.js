const jsdom       = require('jsdom'),
      fs          = require('fs'),
      parse5      = require('parse5'),
      path        = require('path'),
      { test }    = require('tap');

const smartquotes = require('../dist/smartquotes');

test('smartquotes.string()', t => {

  // a list of test strings and expected converted values
  const expectations = {
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
    const document = parse5.parse('"test text"');
    smartquotes.element(document);
    t.match(parse5.serialize(document), /\u201ctest text\u201d/);
    t.end();
  });

  const document = jsdom.jsdom(fs.readFileSync(path.join(__dirname, 'fixtures/basic.html')));
  const window = document.defaultView;

  smartquotes.element(document.body);

  test('converting basic types of quotes to smart quotes', t => {
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
    t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
    t.end();
  });

  test('handling tags inside tags', t => {
    var three = document.getElementById('three');
    t.equal(three.innerHTML, '<p>\u201cThis \u2018text with an inner <em>emphasis</em>\u2019 should be smart, too.</p><p>\u201cSuper smart.\u201d</p>');
    t.end();
  });

  test('retaining proper substrings inside tag', t => {
    var four = document.getElementById('four');
    t.match(four.innerHTML, 'Maar Mees');
    t.end();
  });

  test('does not alter script tags', t => {
    var script = document.getElementsByTagName('SCRIPT')[0];
    t.match(script.innerHTML, 'unchanged = "text"');
    t.end();
  });

  t.end();

});

test('smartquotes()', t => {

  test('detects and converts strings', t => {
    t.equal(smartquotes('"test"'), '\u201ctest\u201d');
    t.end();
  });

  test('detects and converts html documents', t => {

    const document = jsdom.jsdom(fs.readFileSync(path.join(__dirname, 'fixtures/basic.html')));
    const window = document.defaultView;

    var one = document.getElementById('one');
    var two = document.getElementById('two');

    test('converts individual elements if passed as an argument', t => {
      smartquotes(one);
      t.equal(one.innerHTML, 'Ma\u2019am, this \u201ctest\u201d is from \u201995');
      t.equal(two.innerHTML, 'Marshiness of \'Ammercloth\'s');
      t.end();
    });

    test('converts entire document if no argument is passed', t => {
      const _window = global.window;
      const _document = global.document;
      global.document = document;
      global.window = window;
      smartquotes();
      t.equal(two.innerHTML, 'Marshiness of \u2019Ammercloth\u2019s');
      global.window = _window;
      global.document = _document;
      t.end();
    });

    t.end();

  });

  t.end();
});

test('smartquotes in a browser', function(t) {

  jsdom.env({
    file: './test/fixtures/basic.html',
    scripts: [
      '../../dist/smartquotes.js',
      '../../node_modules/webcomponents.js/webcomponents-lite.js'
    ],
    onload: function (window) {

      test('it exists as a global variable', t => {
        t.ok(window.smartquotes);
        t.end();
      });

      test('it can react to DOM mutations', t => {
        var listener = window.smartquotes.listen();
        var addedNode = window.document.createElement('div');
        var changedNode = window.document.createElement('div');
        addedNode.innerHTML = 'Adding "this" node.';
        changedNode.innerHTML = 'No quotes.';
        window.document.body.appendChild(addedNode);
        window.document.body.appendChild(changedNode);
        t.equal(changedNode.innerHTML, 'No quotes.');
        changedNode.childNodes[0].data = "Changing \"this\" node.";
        setTimeout(() => {
          t.equal(addedNode.innerHTML, "Adding \u201cthis\u201d node.");
          t.equal(changedNode.textContent, "Changing \u201cthis\u201d node.");
          listener.disconnect();
          t.end();
        });
      });

      test('it does not replace text in an ignored tag', t => {
        var listener = window.smartquotes.listen();
        var addedNode = window.document.createElement('code');
        var changedNode = window.document.createElement('code');
        addedNode.innerHTML = 'Adding "this" node.';
        changedNode.innerHTML = 'No quotes.';
        window.document.body.appendChild(addedNode);
        t.equal(changedNode.innerHTML, 'No quotes.');
        window.document.body.appendChild(changedNode);
        changedNode.innerHTML = "Changing \"this\" node.";
        setTimeout(() => {
          t.notEqual(addedNode.innerHTML, "Adding \u201cthis\u201d node.");
          t.notEqual(changedNode.innerHTML, "Changing \u201cthis\u201d node.");
          listener.disconnect();
          t.end();
        });
      });

    }
  });
  t.end();

});
