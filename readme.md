##Linebreak.js

A small jQuery plugin that wraps your text in spans. This allows styling not achievable via CSS alone.

###Demo

(Demo here)[http://honiballweb.com/linebreak]

###Usage

Include linebreak.js on your page in the header or footer, according to your preference. Then get some text that you want to run the plugin on. Add `data-linebreak="true"` to the element wrapping it, like so:

```html
&lt;div data-linebreak="true">
Here's some text that I'm going to run linebreak.js on
&lt;/div>
```

Then, in your javascript file, initiate the plugin:

```javascript
// all settings are optional, setting shown here are default
var myLB = linebreak.init({
	$target: $('[data-linebreak="true"]'), // text container
	wordWrap: 'lb-word-wrap', // individual words will be wrapped with this class
	lineWrap: 'lb-line-wrap', // lines will be wrapped with this class
	callback: function() {}
});
```

Then style away with whichever class you used for `lineWrap`.

*Note:* If you apply padding or margins with to your `lineWrap` class, theres a chance the new styles will push words to another line and mess up your beautiful styling. I'd recommend keeping your lines to a maximum percentage width of their container, say 75 percent, to help avoid this situation.

If you want linebreak to watch for changes in screen size and adjust appropriately, just grab that variable you initialized and call the `.watch()` method on it.

```javascript
myLB.watch();
```