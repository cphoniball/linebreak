// Dependencies: jQuery
var linebreak = function(options) {

	$.fn.extend({
		privateWrapWords: function() {
			$(this).html($(this).text().split(' ').map(function(item) {
				return item = '<span class="lb-word-wrap">' + item + ' </span>';
			}).join(' '));
			return $(this);
		},
		privateWrapLines: function() {
			var lines = new Object();
			var offset = 0;
			$('.lb-word-wrap').each(function() {
				offset =  $(this).offset().top;
				$(this).attr('data-offset', Math.round(offset));
			});
			while ($('.lb-word-wrap').length) {
				offset = $('.lb-word-wrap').first().data('offset');
				$('.lb-word-wrap[data-offset=' + offset + ']').removeClass('lb-word-wrap').wrapAll('<span class="highlight"></span>');
			}

			return $(this);
		}
	});


	// returns set of elements that have their data-linebreak="true" attribute
	function privateGetTargets() {
		return $('[data-linebreak="true"]');
	}

	function privateWrapLines() {
	}

	function publicInit() {
		$elements = privateGetTargets();
		$elements.each(function() {
			$(this).privateWrapWords();
		});
		$(document).privateWrapLines();

	}

	return {
		init: publicInit
	};

}();

$(document).ready(function() {

	linebreak.init();

});