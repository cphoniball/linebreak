// Dependencies: jQuery
var linebreak = function() {

	$.fn.extend({
		privateWrapWords: function(wordWrap) {
			$(this).html($(this).text().split(' ').map(function(item) {
				return item = '<span class="' + wordWrap + '">' + item + ' </span>';
			}).join(' '));
			return $(this);
		}
	});

	function privateWrapLines(wordWrap, lineWrap) {
		var lines = {},
			offset = 0;
		$('.' + wordWrap).each(function() {
			offset =  $(this).offset().top;
			$(this).attr('data-offset', Math.round(offset));
		});
		while ($('.' + wordWrap).length) {
			offset = $('.' + wordWrap).first().data('offset');
			$('.' + wordWrap + '[data-offset=' + offset + ']').removeClass(wordWrap).wrapAll('<span class="' + lineWrap + '"></span>');
		}
	}

	function publicWrapLineBreaks(options) {
		var $target = options.$target || $('[data-linebreak="true"]'),
			wordWrap = options.wordWrap || 'lb-word-wrap',
			lineWrap = options.lineWrap || 'lb-line-wrap';

		$target.each(function() {
			$(this).privateWrapWords(wordWrap);
		});
		privateWrapLines(wordWrap, lineWrap);
	}

	return {
		init: publicInit,
		wrapLines: publicWrapLineBreaks

	};

}();

$(document).ready(function() {

	linebreak.wrapLines({
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'lb-line-wrap'
	});


});