smartquotes.js
==============

Smart quotes are smart typography, and now it’s just a ’script away. 

Visit the homepage at <a href="http://smartquotesjs.com">smartquotesjs.com</a>.

#### What are smart quotes?

“Smart quotes,” or “curly quotes,” are the proper typographical way to represent quotation marks. Unfortunately, in order to save space on the keyboard, the dumb quote was created. Smartquotes.js is here to convert all your dumb quotes back to smart ones.

#### Why should I use smart quotes?

Smart quotes are the correct way. They increase legibility and professionalism. Dumb quotes are for the lazy person. Dumb quotes are unprofessional. And now you have no excuse not to use smart quotes.

#### What about measurements? What quotes do I use?

Measurements use what are called “primes.” Smartquotes.js handles those too.

#### Okay, so what about a backwards apostrophe?

Technically, words that are shortened at the beginning require a backwards apostrophe. There’s only so much a script can do by itself, though. Smartquotes.js tries to catch what it can, namely abbreviated years like ’13 and places like the ’burbs, but in the cases that it can’t—there’s not much ’splainin’ to do—just use &rsquo; or try wrapping the word in a <span> tag.

#### What do I need to change in my code?

Nothing. Just include the script, and Smartquotes.js will detect all your dumb quotes and convert them to the respective smart versions. If you use jQuery, put this script after jQuery and Smartquotes.js will use jQuery’s onload event. Otherwise, Smartquotes.js doesn’t have any dependencies and can be used by itself.

#### What tags are converted automatically?

Everything is converted except for `<code>`, `<script>`, and `<style>` tags.
