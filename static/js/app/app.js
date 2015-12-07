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

var $search = (function() {

	function Search(ele) {
		this.ele = $(ele);
		this.init();
	}
	Search.prototype.CONST = {
		modal: '.modal',
		modalVisible: 'modal-is-visible',
		modalSearch: '.input'
	}
	Search.prototype.init = function() {
		if (!this.ele) return;
		this.modal = $(document.querySelector(this.CONST.modal));
		this.modalInput = $(this.modal.find(this.CONST.modalSearch));
		this.ele.on('click', function() {
			this.modal.addClass(this.CONST.modalVisible);
		}.bind(this));
		this.modalInput.on('input', function() {
			window.$ajax.request('/search', {
				body: JSON.stringify({
					search: 1
				})
			});
		}.bind(this))
	}
	Search.prototype.search = function() {

	}
	$search = new Search(search);
}());