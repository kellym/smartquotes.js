smartquotes.js
==============

Smart quotes are smart typography, and now it’s just a ’script away. 

Visit the homepage at <a href="http://smartquotesjs.com">smartquotesjs.com</a>.

```markup
<script src="smartquotes.min.js"></script>
<script> smartquotes() </script>
```
#### What are smart quotes?

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

To generate smartquotes.min.js and smartquotes.min.js.map, run `npm run build`.
