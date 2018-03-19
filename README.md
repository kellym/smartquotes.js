smartquotes.js
==============

Smart quotes are smart typography, and now it’s just a ’script away.

Visit the homepage at <a href="https://smartquotes.js.org">smartquotes.js.org</a>. If you're planning on using this with node.js and express, try the express middleware <a href="http://github.com/kellym/express-smartquotes">express-smartquotes</a>.

[![Build Status](https://travis-ci.org/kellym/smartquotesjs.svg?branch=master)](https://travis-ci.org/kellym/smartquotesjs)

### Installation

`smartquotes` is available in both npm and bower.

```
npm install smartquotes
```
```
bower install smartquotes
```

Or download and use straight in your HTML:

```markup
<script src="smartquotes.js"></script>
<script>smartquotes()</script>
```

### Usage

For Node, require the script and pass it a string, or use the `string` method. Both
are equivalent.

```javascript
const smartquotes = require('smartquotes');

let myString = smartquotes('This is my "smart-quoted" string.');
let myString2 = smartquotes.string('This is the "same" thing.');
```

Browser-based usage is similar, with the addition of another method to handle
DOM elements:

```javascript
var smartquotes = require('smartquotes'); // both AMD and CommonJS module formats work

// Run smartquotes over the entire document after it's loaded
smartquotes();

// Run smartquotes over a specific element
smartquotes(document.getElementById('myElement'));

// To listen to DOM changes:
smartquotes.listen();

// To run smartquotes over the entire document *and* listen for changes:
smartquotes().listen();
```

### What are smart quotes?

“Smart quotes,” or “curly quotes,” are the proper typographical way to represent quotation marks. Unfortunately, in order to save space on the keyboard, the dumb quote was created. Smartquotes.js is here to convert all your dumb quotes back to smart ones.

#### Why should I use smart quotes?

Smart quotes are the correct way. They increase legibility and professionalism. Dumb quotes are for the lazy person. Dumb quotes are unprofessional. And now you have no excuse not to use smart quotes.

#### What about measurements? What quotes do I use?

Measurements use what are called “primes.” Smartquotes.js handles those too.

#### Okay, so what about a backwards apostrophe?

Technically, words that are shortened at the beginning require a backwards apostrophe. There’s only so much a script can do by itself, though. Smartquotes.js tries to catch what it can, namely abbreviated years like ’13 and places like the ’burbs, but in the cases that it can’t—there’s not much ’splainin’ to do—just use &rsquo; or try wrapping the word in a <span> tag.

#### What do I need to change in my code?

Just include the script, call `smartquotes()` once the page has loaded, and Smartquotes.js will detect all your dumb quotes and convert them to the respective smart versions. Smartquotes.js doesn’t have any dependencies and can be used by itself.

#### What tags are converted automatically?

Everything is converted except for `<code>`, `<script>`, `<style>`, and `<pre>` tags.

## Contributing

If you find bugs or additions to the code, the best way to contribute is to fork this repo, make the changes (without updating version numbers), and make a pull request back to this repo to be merged in.

The repository has Travis-CI running, but be sure to add any necessary tests and run `npm test` before opening a PR.
