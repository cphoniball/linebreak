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
		callback: false,
		contents: ''
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
		return settings.$target.text();
	}

	function privateResetContents() {
		settings.$target.html(settings.contents);
	}

	function publicWrapLineBreaks() {
		settings.$target.each(function() {
			$(this).privateWrapWords(settings.wordWrap);
		});
		privateWrapLines();
		if (settings.callback) settings.callback();
		return this;
	}

	(function($,sr){

	  // debouncing function from John Hann
	  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	  var debounce = function (func, threshold, execAsap) {
	      var timeout;
	      return function debounced () {
	          var obj = this, args = arguments;
	          function delayed () {
	              if (!execAsap) func.apply(obj, args);
	              timeout = null;
	          };

	          if (timeout) clearTimeout(timeout);
	          timeout = setTimeout(delayed, threshold || 100);
	      };
	  }
	    // smartresize
	    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn, 500)) : this.trigger(sr); };

	})(jQuery,'smartresize');

	function publicWatch() {
		$(window).smartresize(function() {
			console.log('resize event firing');
			privateResetContents();
			publicWrapLineBreaks();
		});
		return this;
	}

	function publicInit(options) {
		$.extend(settings, options);
		// save initial content for resize
		settings.contents = privateSaveContents();

		publicWrapLineBreaks();

		console.log(settings);
		return this;
	}

	return {
		init: publicInit,
		wrapLines: publicWrapLineBreaks,
		watch: publicWatch
	};

}();

$(document).ready(function() {

	var myLinebreak = linebreak.init({
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'highlight'
	}).watch();


});