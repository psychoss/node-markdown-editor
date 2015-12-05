var SlideLayout = (function() {
	var sl = {};

	function refresh(v) {
		try {
			var datas = JSON.parse(v);
			sl.ele.html("");
			sl.ele.html(noteList(datas));
			bindLinks();
		} catch (error) {

		}

	}

	function init() {
		var slidePlace = document.querySelector('.slide-layout .menu');
		var toggleButton = $(document.querySelector('.header-toggle-btn'));
		var slideLayout = $(document.querySelector('.slide-layout'));

		sl.ele = sl.ele || $(slidePlace);
		resize();
		window.addEventListener('resize', resize);
		document.addEventListener('click', function() {
			slideLayout.removeClass('is-active');
		});

		toggleButton.on('click', function(ev) {
			ev.stopImmediatePropagation();
			slideLayout.addClass('is-active');
		})

		var searchInput = document.querySelector('.menu-search-input');

		searchInput.addEventListener('click', function(ev) {
			ev.stopImmediatePropagation()
		});
		var timeout;

		searchInput.addEventListener('input', function() {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				var c = searchInput.value;
				if (c.trim())
					filter(c);
				else {
					var ls = note_list.children;
					for (l = ls.length; l--;) {
						ls[l].setAttribute('style', '');
					}
				}
			}, 50);
		})
	}

	function filter(v) {
		v = eval('/' + v + '/i')
		var ls = note_list.children;
		for (l = ls.length; l--;) {
			var c = ls[l];
			var vc = c.children[0].getAttribute('title');

			if (!~vc.search(v)) {
				c.style.display = 'none';
			} else {
				ls[l].setAttribute('style', '');
			}
		}
	}

	function resize() {
		sl.ele.css('max-height', (window.innerHeight - 30) + 'px');
	}

	function bindLinks() {

		var links = sl.ele.querySelectorAll('.menu-item-link');
		var l = links.length;
		while (l--) {
			links[l].addEventListener('click', function(v) {
				editor.getContent(v.currentTarget.getAttribute('data-binding'));
			})

		}
	}



	function noteList(datas) {
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
	init();
	sl.refresh = refresh;
	return sl;
}());