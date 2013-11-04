$(document).ready(function() {
	var myLinebreak = linebreak.init({
		$target: $('[data-linebreak="true"]'),
		wordWrap: 'lb-word-wrap',
		lineWrap: 'lb-line-wrap highlight'
	}).watch();
});