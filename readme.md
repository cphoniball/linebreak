##Linebreak.js

A small jQuery plugin that wraps your text in spans. This allows styling not achievable via CSS alone.

###Demo

(Demo here)[http://honiballweb.com/linebreak]

###Usage

Include linebreak.js on your page in the header or footer, according to your preference. Then get some text that you want to run the plugin on. Add `data-linebreak="true"` to the element wrapping it, like so:

<pre><code class="language-html">&lt;div data-linebreak="true">
Here's some text that I'm going to run linebreak.js on
&lt;/div></code></pre>

Then, in your javascript file, initiate the plugin:

```javascript
var myLB = linebreak.init({
	$target: $('[data-linebreak="true"]'), // text container
	wordWrap: 'lb-word-wrap', // individual words will be wrapped with this class
	lineWrap: 'lb-line-wrap', // lines will be wrapped with this class
	callback: function() {}
});
```

Then style away with whichever class you used for `lineWrap`.

__n

If you want linebreak to watch for changes in screen size and adjust appropriately, just grab that variable you initialized and call the `.watch()` method on it.

<pre><code class="language-javascript">myLB.watch();</code></pre>

###Bugs
 - There are situations in which styling applied via the line wrap class causes words to shift lines - need to come up with a solution for this. Perhaps apply the styling to all of the text before taking the offset?k