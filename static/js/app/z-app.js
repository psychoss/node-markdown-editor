(function() {
	$ajax.fetch("/query-all").then(function(v) {
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
}());


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

		this.modal = new $Modal(document.querySelector(this.CONST.modal));
		this.modalInput = $(this.modal.find(this.CONST.modalSearch));
		this.modalList = document.querySelector(this.CONST.modalList);

		this.bindEvent();

	}
	Search.prototype.showModal = function() {
		this.modal.show();
	}
	Search.prototype.inputEvent = function(ev) {
		if (ev.keyCode === 13) {
			var searchText = this.modalInput.value.trim();
			if (searchText) {
				this.search(searchText);
			}
		}
	}
	Search.prototype.menuClick = function(ev) {
		var id = ev.target.getAttribute('data-binding');
		if (id) {
			this.modal.hide();
			setTimeout(function() {
				editor.getContent(id);
			}, 1);
		}
		console.log(id);
	}
	Search.prototype.bindEvent = function() {
		if (this.modal) {
			this.ele.on('click', this.showModal.bind(this));
		}
		if (this.modalInput && this.modalList) {
			this.modalInput.on('keydown', this.inputEvent.bind(this))
		}
		if (this.modalList) {
			this.modalList.addEventListener('click', this.menuClick.bind(this))
		}
	}
	Search.prototype.search = function(v) {

		var thenResponse = function(text) {
			this.modalList.innerHTML = ""
			this.modalList.innerHTML = this_.template(JSON.parse(text))
		}.bind(this);

		var this_ = this;
		$ajax.fetch('/search', {
			data: JSON.stringify({
				search: v
			})
		}).then(thenResponse, function() {
			console.log(arguments);
		});
	}
	Search.prototype.template = function(datas) {
		var content = "";
		var noteItem = "<li class=\"modal-item\"><a class=\"modal-link\" data-binding=\"{_id}\">{content}</a></li>";
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

	$search = new Search(search);
}());