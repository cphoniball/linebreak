/* Name: Linebreak.js
 * Author: Chris Honiball
 * Description:
 * Dependencies: jQuery
 */

var Linebreak = function(options) {

	this.$target = options.$target || $('[data-linebreak="true"]');
	this.wordWrap = options.wordWrap || 'lb-word-wrap';
	this.lineWrap = options.lineWrap || 'lb-line-wrap';
	this.callback = options.callback || false;
	this.watch = options.watch || false;
	this.originalText = $target.text();

	$.fn.extend({
		privateWrapWords: function(wordWrap) {
			$(this).html($(this).text().split(' ').map(function(item) {
				return item = '<span class="' + wordWrap + '">' + item + ' </span>';
			}).join(' '));
			return $(this);
		}
	});

	function privateWrapLines() {
		var lines = {}, offset = 0, counter = 0;
		$('.' + wordWrap).each(function() {
			offset =  $(this).offset().top;
			$(this).attr('data-offset', Math.round(offset));
		});
		while ($('.' + wordWrap).length) {
			offset = $('.' + wordWrap).first().data('offset');
			// wrap line in span and add data attributes
			$('.' + wordWrap + '[data-offset=' + offset + ']')
				.removeClass(wordWrap)
				.wrapAll('<span class="' + lineWrap + '" data-linenum="' + counter + '" data-offset="' + offset + '"></span>');
				counter++;
		}
		// remove inner
	}

	function privateWatch() {
		var hasResized = false;

		$(window).resize(function() {
			hasResized = true;
		});

		setInterval(function() {
			if (hasResized) {
				hasResized = false;
				console.log('Resize functions fired.');
				privateReplaceWithOriginal();
				publicWrapLineBreaks();
			}
		}, 1000);
	}

	function privateReplaceWithOriginal() {
		$target.contents().remove();
		$target.text(originalText);
	}

	function publicWrapLineBreaks() {
		$target.privateWrapWords(wordWrap);
		privateWrapLines(wordWrap, lineWrap);
		if (callback) { callback(); }
	}

	function publicInit() {
		publicWrapLineBreaks();

		if (watch) {
			privateWatch();
		}
	}


	return {
		wrapLines: publicWrapLineBreaks
	};

}();

$(document).ready(function() {

	var linebreak = new Linebreak({
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'highlight',
		watch: true
	});


});