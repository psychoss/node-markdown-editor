(function() {

	var trigger = document.querySelector('.dropdown-trigger');
	var dropdown = new DropDown({
		trigger: trigger,
		template: 'template/dropdown.html',
		loadImmediate: true,
		loaded: function(obj) {

			editor.bindCommands(obj.querySelectorAll('.command'));

			var cs = obj.querySelectorAll('.category');
			var i = cs.length;
			for (; i--;) {
				cs[i].addEventListener('click', function(ev) {
					var sel = obj.querySelector('.category.is-selected');
					if (sel) {
						console.log(sel);;
						sel.classList.remove('is-selected')
					}
					ev.target.parentNode.classList.add('is-selected');
				})
			}
		}
	});


	var categoryTrigger = document.querySelector('.categories-dropdown-trigger');
	var categoryDropdown = new DropDown({
		trigger: categoryTrigger,
		template: 'template/dropdown-cat.html',
		width: 186,
		loaded: function(obj) {
			var dr = obj.querySelector('.dropdown')
			if (dr) {
				dr.addEventListener('click', function(ev) {
					ev.stopImmediatePropagation();
					var cr = document.querySelector('.combobox__name');
					cr.innerText = ev.target.innerText
					categoryDropdown.hide();
					if (cr.innerText === 'Notes') {
						$slideLayout.refreshDefault();
						return;
					}
					$ajax.fetch("/query-category", {
						method: "POST",
						data: JSON.stringify({
							cat: cr.innerText.trim()
						})
					}).then(function(v) {
						$slideLayout.refresh(v);
					}, function() {
						console.log(arguments);
					})
				})
			}
		}
	});




	// When the page loaded, get the note list from web server.
	//$slideLayout.refreshDefault();
	document.addEventListener('keydown', function(ev) {
		var k = (ev.which || ev.keyCode);
		// Prevent page backforward on pressing BackSpace.
		if (k === 8 && ev.target.tagName !== 'INPUT') {
			ev.preventDefault();
		}
		// Prevent page refresh on pressing F5.
		if (k === 116) {
			console.log(ev)
			ev.preventDefault();
		}
	});

	window.onbeforeunload = function(e) {
		var message = "Are you sure leave this page?",
			e = e || window.event;
		// For IE and Firefox
		if (e) {
			e.returnValue = message;
		}

		// For Safari
		return message;
	};
}());


var $search = (function() {

	function Search(ele) {
		this.ele = $(ele);
		this.init();
	}
	/**
	 * ------------------------------------------------------------------------
	 *
	 * ------------------------------------------------------------------------
	 */
	Search.prototype.CONST = {
		modal: '.modal',
		modalVisible: 'modal-is-visible',
		modalSearch: '.input',
		modalSearchButton: '.btn-default',
		modalList: '.modal-list',
		template: "<li class=\"modal-item\"><a class=\"modal-link\" data-binding=\"{_id}\">{content}</a></li>"
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
			//Fired the search if the enter key pressed.
			this.search();
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
	}
	Search.prototype.bindEvent = function() {
		if (this.modal) {
			this.ele.on('click', this.showModal.bind(this));
			var searchButton = this.modal.find(this.CONST.modalSearchButton);
			if (searchButton) {
				searchButton.addEventListener('click', this.search.bind(this));
			}
		}
		if (this.modalInput && this.modalList) {
			this.modalInput.on('keydown', this.inputEvent.bind(this))
		}
		if (this.modalList) {
			this.modalList.addEventListener('click', this.menuClick.bind(this));

		}

	}
	Search.prototype.search = function() {
			var searchText = this.modalInput.value.trim();
			if (!searchText) return;
			var thenResponse = function(text) {
				this.modalList.innerHTML = ""
				this.modalList.innerHTML = this_.template(JSON.parse(text))
			}.bind(this);

			var this_ = this;
			$ajax.fetch('/search', {
				data: JSON.stringify({
					search: searchText
				})
			}).then(thenResponse, function() {
				console.log(arguments);
			});
		}
		/*
		The content generator of search result.
		*/
	Search.prototype.template = function(datas) {
		var content = "";
		var t = this.CONST.template;
		var template = /{([a-zA-Z_\-0-9]+)}/g;
		var line = function(data) {
			return t.replace(template, function(m, g) {
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