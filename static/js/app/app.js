ajax.fetch("/query-all").then(function(v) {
	SlideLayout.refresh(v);
}, function() {}, function() {});

document.addEventListener('keydown', function(ev) {
	var k = (ev.which || ev.keyCode);
	if (k === 8 || k === 116) {
		ev.preventDefault();
	}
	console.log(ev);
})