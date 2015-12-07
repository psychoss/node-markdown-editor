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
		modalSearch: '.input',
		modalList: '.modal-list'
	}
	Search.prototype.init = function() {
		if (!this.ele) return;
		this.modal = $(document.querySelector(this.CONST.modal));
		this.modalInput = $(this.modal.find(this.CONST.modalSearch));
		thsi.modalList=document.querySelector(this_.CONST.modalList);
		this.ele.on('click', function() {
			this.modal.addClass(this.CONST.modalVisible);
		}.bind(this));
		this.modalInput.on('keydown', function(ev) {
			if (ev.keyCode === 13) {
				var searchText = this.modalInput.value.trim();
				if (searchText) {
					this.search(searchText);
				}
			}

		}.bind(this))
	}
	Search.prototype.search = function(v) {
		var this_ = this;
		console.log(v);
		window.$ajax.request('/search', {
			body: JSON.stringify({
				search: v
			})
		}).then(function(rsp) {
			rsp.text().then(function(text) {
				var l = 
				l.innerHTML = ""
				l.innerHTML = this_.template(JSON.parse(text))

			}, function() {

			})
		}, function() {

		});
	}
	Search.prototype.template = function(datas) {
		var content = "";
		var noteItem = "<li><a data-binding=\"{_id}\">{content}</a></li>";
		var template = /{([a-zA-Z_\-0-9]+)}/g;
		var line = function(data) {
			return noteItem.replace(template, function(m, g) {
				if (g === "_id")
					return data[g];
				return data[g].escapeHTML();
			})
		}

		for (var index = 0, l = datas.length; index < l; index++) {
			content += line(datas[index]);
		}
		return content;
	}
	Search.prototype.bindEvent=function(){
		
	}
	$search = new Search(search);
}());