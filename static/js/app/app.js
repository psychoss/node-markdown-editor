ajax.fetch("/query-all").then(function(v) {
	SlideLayout.refresh(v);
}, function() {}, function() {});




