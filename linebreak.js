/* Name: Linebreak.js
 * Author: Chris Honiball
 * Description:
 * Dependencies: jQuery
 */

var linebreak = function() {

	var settings = {
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'lb-line-wrap',
		callback: false
	};

	$.fn.extend({
		privateWrapWords: function() {
			$(this).html($(this).text().split(' ').map(function(item) {
				return item = '<span class="' + settings.wordWrap + '">' + item + ' </span>';
			}).join(' '));
			return $(this);
		}
	});

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

	function privateSaveContents() {
		//return settings.$target.html();
	}

	function publicWrapLineBreaks() {
		privateSaveContents(settings.$target);

		settings.$target.each(function() {
			$(this).privateWrapWords(settings.wordWrap);
		});
		privateWrapLines();

		if (settings.callback) { settings.callback(); }

		return this;
	}

	function publicWatch() {
		$(window).resize(function() {
			publicWrapLineBreaks();
		});
	}

	function publicInit(options) {
		$.extend(settings, options);

		console.log(settings);

		// save initial content for resize
		//settings.contents = privateSaveContents();
		return this;
	}

	function getSettings() {
		return settings;
	}

	return {
		init: publicInit,
		wrapLines: publicWrapLineBreaks,
		watch: publicWatch,
		getSettings: getSettings
	};

}();

$(document).ready(function() {

	var myLinebreak = linebreak.init({
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'highlight'
	}).wrapLines();


});