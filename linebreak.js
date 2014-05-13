/* Name: Linebreak.js
 * Author: Chris Honiball
 * Description: Wraps lines of text in spans to allow styling of individual lines that would not otherwise be possible because
 * of the CSS block model.
 * Dependencies: jQuery
 */

var linebreak = (function() {

	var settings = {
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'lb-line-wrap',
		callback: false,
		contents: ''
	};

	$.fn.extend({
		// Grabs the text content of the $(this) element, splits the string into an array, and then wraps each
		// element of the array in a span with class of settings.wordWrap before joining the array and setting
		// $(this)'s content to the new string
		_wrapWords: function() {
			$(this).html($(this).text().split(' ').map(function(item) {
				return '<span class="' + settings.wordWrap + '">' + item + ' </span>';
			}).join(' '));
			return $(this);
		},
		// A replacement for the jQuery $(window).resize() function that incorporates debouncing
		smartresize: function(func, threshold) {
			return func ? this.bind('resize', _debounce(func, threshold)) : this.trigger(smartresize);
		}
	});

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	// Works by repeatedly issuing and clearing setTimeouts when an event is triggered
	function _debounce(func, threshold) {
		var timeout;
		return function debounced() {
			var obj = this, args = arguments;
			function delayed() {
				func.apply(obj, args);
				timeout = null;
			}
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(delayed, threshold || 100);
		};
	}

	// Wraps each line in a span of class settings.lineWrap
	function wrapLines() {
		var lines = {}, offset = 0, counter = 0;

		// wrap individual words
		settings.$target.each(function() {
			$(this)._wrapWords(settings.wordWrap);
		});

		// Iterates through each element that has been previously wrapped with settings.wordWrap and assigns it a data-offset attribute
		// equal to the offset from the top of the document
		$('.' + settings.wordWrap).each(function() {
			offset =  $(this).offset().top;
			$(this).attr('data-offset', Math.round(offset));
		});
		// Iterates while there exist elements of class settings.wordWrap
		// Does the following:
		//    1. Grabs the offset of the first element in the matched set
		//    2. Grabs all elements that match that offset
		//    3. Removes the settings.wordWrap class from those elements
		//    4. Wraps all the elements in a span of class settings.lineWrap
		while ($('.' + settings.wordWrap).length) {
			offset = $('.' + settings.wordWrap).first().data('offset');

			$('.' + settings.wordWrap + '[data-offset=' + offset + ']').removeClass(settings.wordWrap)
			.wrapAll('<span class="' + settings.lineWrap + '" data-linenum="' + counter + '" + data-offset="' + offset + '"></span>');

			counter++;
		}

		// run callback if set
		if (settings.callback) settings.callback();

		return this;
	}

	// Check that the offsets on words match the offsets on lines
	function _checkOffsets() {
		var $lines = $('.' + settings.lineWrap);

		$lines.each(function() {
			var offset = $(this).data('offset');
			$(this).children('span').each(function() {
				if ($(this).data('offset') !== offset) {
					// what do I do with things that don't match?
				}
			});
		});
	}

	// Watches for resize using a debounce function
	// On resize, after a 500ms delay resets the $target contents to the original text and runs publicWrapLinebreaks again
	function watch() {
		$(window).smartresize(function() {
			settings.$target.html(settings.contents);
			wrapLines();
		}, 500);
		return this;
	}

	function init(options) {
		// Set settings my merging settings and options object
		$.extend(settings, options);

		// Set original content for watch function
		settings.contents = settings.$target.text();

		// Run Wrap Lines
		wrapLines();

		return this;
	}

	return {
		init: init,
		wrapLines: wrapLines,
		watch: watch
	};

})();
