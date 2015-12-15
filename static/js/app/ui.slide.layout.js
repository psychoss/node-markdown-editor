var $slideLayout = (function() {


	function SlideLayout() {
		this.init();
	}

	SlideLayout.prototype.init = function() {
		this.ele = document.querySelector('.slide-layout .menu');
		var toggleButton = document.querySelector('.header-toggle-btn');
		var slideLayout = $('.slide-layout');

		this.settingsSelect();
		this.settingsSearch();
		toggleButton.addEventListener('click', function(ev) {
			ev.stopImmediatePropagation();
			slideLayout.addClass('is-active');
		});
		document.addEventListener('click', function() {
			slideLayout.removeClass('is-active');
		});
		this.resize();
		window.addEventListener('resize', this.resize.bind(this));

	}
	SlideLayout.prototype.refresh = function(v) {
		try {
			var datas = JSON.parse(v);
			this.ele.innerHTML = this.refreshList(datas);
			this.bindLinks();
		} catch (error) {

		}
	}
	SlideLayout.prototype.settingsSelect = function(v) {

		// var select = document.querySelector('.combobox');
		// select.addEventListener('click', function(ev) {
		// 	ev.stopImmediatePropagation()

		// })
		// console.log(select);
		// select.style['margin-top'] = '3px';

	}

	SlideLayout.prototype.settingsSearch = function(v) {

		var self = this;
		var searchInput = document.querySelector('.menu-search-input');

		searchInput.addEventListener('click', function(ev) {
			ev.stopImmediatePropagation()
		});
		var timeout;

		searchInput.addEventListener('input', function() {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				console.time("filter")
				var c = searchInput.value;
				if (c.trim())
					self.filter(c);
				else {
					var ls = note_list.children;
					for (l = ls.length; l--;) {
						ls[l].classList.remove('hidden');
					}
				}
				console.timeEnd("filter");
			}, 50);
		})

	}



	SlideLayout.prototype.filter = function(v) {
		v = eval('/' + v + '/i')
		var ls = note_list.children;

		for (l = ls.length; l--;) {
			var c = ls[l];


			if (!~c.textContent.search(v)) {
				if (!c.classList.contains('hidden'))
					c.classList.add('hidden');
			} else {
				if (c.classList.contains('hidden'))
					c.classList.remove('hidden');
			}
		}
	}

	SlideLayout.prototype.resize = function() {
		this.ele.style.maxHeight = (window.innerHeight - 100) + 'px';
	}

	SlideLayout.prototype.bindLinks = function() {

		var links = this.ele.querySelectorAll('.menu-item-link');
		var l = links.length;
		while (l--) {
			links[l].addEventListener('click', function(v) {
				editor.getContent(v.currentTarget.getAttribute('data-binding'));
			})

		}
	}

	SlideLayout.prototype.refreshDefault = function() {
		var self = this;
		$ajax.fetch("/query-all", {
			method: 'POST'
		}).then(function(v) {
			self.refresh(v);
		}, function() {
			console.log(arguments);
		});

	}

	SlideLayout.prototype.refreshList = function(datas) {
		var content = "";
		var noteItem = "<li class=\"menu-item\"><a class=\"menu-item-link vertical-align\" data-binding=\"{_id}\" title=\"{title}\"><span class=\"vertical-container\"><span class=\"menu-name\">{title}</span></span></a></li>";
		var template = /{([a-zA-Z_\-0-9]+)}/g;
		var line = function(data) {
			return noteItem.replace(template, function(m, g) {
				return data[g];
			})
		}

		for (var index = 0, l = datas.length; index < l; index++) {
			content += line(datas[index]);
		}
		return content;
	}
	return new SlideLayout();
}());