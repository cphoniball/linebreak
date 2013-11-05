/* Name: Linebreak.js
 * Author: Chris Honiball
 * Description:
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
		privateWrapWords: function() {
			$(this).html($(this).text().split(' ').map(function(item) {
				return '<span class="' + settings.wordWrap + '">' + item + ' </span>';
			}).join(' '));
			return $(this);
		},
		smartresize: function(func, threshold) {
			return func ? this.bind('resize', privateDebounce(func, threshold)) : this.trigger(smartresize);
		}
	});


	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	function privateDebounce(func, threshold) {
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

	function privateWrapLines() {
		var lines = {}, offset = 0, counter = 0;
		$('.' + settings.wordWrap).each(function() {
			offset =  $(this).offset().top;
			$(this).attr('data-offset', Math.round(offset));
		});
		while ($('.' + settings.wordWrap).length) {
			offset = $('.' + settings.wordWrap).first().data('offset');
			$('.' + settings.wordWrap + '[data-offset=' + offset + ']').removeClass(settings.wordWrap).wrapAll('<span class="' + settings.lineWrap + '" data-linenum="' + counter + '"></span>');
			counter++;
		}
	}

	function publicWrapLineBreaks() {
		settings.$target.each(function() {
			$(this).privateWrapWords(settings.wordWrap);
		});
		privateWrapLines();
		if (settings.callback) settings.callback();
		return this;
	}

	function publicWatch() {
		$(window).smartresize(function() {
			console.log('resize event firing');
			settings.$target.html(settings.contents);
			publicWrapLineBreaks();
		}, 500);
		return this;
	}

	function publicInit(options) {
		$.extend(settings, options);
		settings.contents = settings.$target.text();
		publicWrapLineBreaks();
		console.log(settings);
		return this;
	}

	return {
		init: publicInit,
		wrapLines: publicWrapLineBreaks,
		watch: publicWatch
	};

})();
