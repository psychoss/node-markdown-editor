ajax.fetch("/query-all").then(function(v) {
	SlideLayout.refresh(v);
}, function() {}, function() {});

document.addEventListener('keydown', function(ev) {
	var k = (ev.which || ev.keyCode);
	if (k === 8 && ev.target.tagName !== 'INPUT') {
		ev.preventDefault();
	}
	if (k === 116) {
		console.log(ev)
		ev.preventDefault();
	}
})