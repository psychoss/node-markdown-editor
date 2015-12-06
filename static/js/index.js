var ajax = (function() {
	var j = {
		defaluts: {
			method: 'POST'
		}

	};

	function fetch(url, options) {
		options = options || {};
		extend(options, j.defaluts);
		return Q.Promise(function(resolve, reject, notify) {


			var request = new XMLHttpRequest();

			request.open(options.method, url, true);
			request.onload = onload;
			request.onerror = onerror;
			request.onprogress = onprogress;
			var data = options.data || '';
			request.send(data);

			function onload() {
				if (request.status === 200) {
					resolve(request.responseText);
				} else {
					reject(new Error("Status code was " + request.status));
				}
			}

			function onerror() {
				reject(new Error("Can't XHR " + JSON.stringify(url)));
			}

			function onprogress(event) {
				notify(event.loaded / event.total);
			}
		});
	}
	j.fetch = fetch;
	return j;
}());


var extend = (function() {
	return function(destination, source) {

		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				destination[key] = source[key];
			}
		}
	}
}());


var $ = (function() {
	return function $(id) {
		var el = 'string' == typeof id ? document.getElementById(id) : id;

		el.on = function(event, fn) {
			if ('ready' == event) {
				event = window.attachEvent ? "load" : "DOMContentLoaded";
			}
			el.addEventListener ? el.addEventListener(event, fn, false) : el.attachEvent("on" + event, fn);
		};

		el.all = function(selector) {
			return $(el.querySelectorAll(selector));
		};

		el.each = function(fn) {
			for (var i = 0, len = el.length; i < len; ++i) {
				fn($(el[i]), i);
			}
		};

		el.getClasses = function() {
			return this.getAttribute('class').split(/\s+/);
		};

		el.addClass = function(name) {
			var classes = this.getAttribute('class');
			if (classes.indexOf(name) === -1) {
				el.setAttribute('class', classes ? classes + ' ' + name : name);
			}
		};

		el.removeClass = function(name) {
			var classes = this.getAttribute('class');
			if (~classes.indexOf(name)) {
				el.setAttribute('class', classes ? classes.replace(name, "").trim() : name);
			}
		};
		el.css = function(name, value) {
			return value ? el.style[name] = value : el.style[name];
		}
		el.attr = function(name, value) {
			return value ? el.setAttribute(name, value) : el.getAttribute(name);
		}
		el.html = function(value) {
			return value ? el.innerHTML = value : el.innerHTML;
		}
		return el;
	}


}());


var $log = (function() {
	var l = {}

	function d() {
		console.log("Debug: ", arguments);
	}
	function e(){
		console.error("Error:",arguments);
	}
	l.d = d;
	return l;
}());


(function() {
	if (!Object.prototype.watch) {
		Object.defineProperty(Object.prototype, "watch", {
			enumerable: false,
			configurable: true,
			writable: false,
			value: function(prop, handler) {
				var
					oldval = this[prop],
					newval = oldval,
					getter = function() {
						return newval;
					},
					setter = function(val) {
						oldval = newval;
						return newval = handler.call(this, prop, oldval, val);
					};

				if (delete this[prop]) { // can't watch constants
					Object.defineProperty(this, prop, {
						get: getter,
						set: setter,
						enumerable: true,
						configurable: true
					});
				}
			}
		});
	}

	// object.unwatch
	if (!Object.prototype.unwatch) {
		Object.defineProperty(Object.prototype, "unwatch", {
			enumerable: false,
			configurable: true,
			writable: false,
			value: function(prop) {
				var val = this[prop];
				delete this[prop]; // remove accessors
				this[prop] = val;
			}
		});
	}
}());


;
(function() {

	String.prototype.int = function() {
		return parseInt(this, 10);
	}
	String.prototype.fmt = function() {
		var arr = [].slice.call(arguments, 0);
		var i = -1;
		return this.replace(/_/g, function() {
			i++;
			return arr[i];
		})
	}
	String.prototype.px = function() {
		var l = arguments.length;
		var i = 0;
		while (l--) {
			i += arguments[l]
		}
		return i + "px";
	}
	String.prototype.firstLine = function() {

		if (this) {
			var line = this.split('\n')[0];
			if (line.startsWith("#")) {
				return line.replace(/^#+ */, '')
			} else {
				return line;
			}
		} else {
			return null;
		}
	}
}());


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


;
(function() {
	function AutoSize() {
		this.init();
	}

	AutoSize.prototype.cache = {
		es: null
	}
	AutoSize.prototype.init = function() {
		if (!this.es) {
			this.es = document.querySelectorAll("[auto-resize]");
			window.addEventListener('resize', this.init.bind(this));
		}
		var l = this.es.length;;
		for (; l--;) {
			this.resize(this.es[l]);
		}
		//this.es = es;
	}
	AutoSize.prototype.resize = function(e) {
		var ot = parseInt(e.getAttribute("offset-top"), 10) || 0
		var ob = 15;
		var sy = parseInt(e.getAttribute('subtract-y'), 10) || 0;
		var h = e.getAttribute("half");
		var g = parseInt(e.getAttribute('gutter'), 10)
		if (h) {
			e.style.width = (window.innerWidth / 2 - g) + 'px';
		}
		e.style.marginTop = ot + 'px';

		e.style.height = (window.innerHeight - ot - ob - sy) + "px";
	}

	new AutoSize();
}());


 var editor = (function() {
 	/**
 	 * ------------------------------------------------------------------------
 	 *  setting and initialize the editor
 	 * ------------------------------------------------------------------------
 	 */
 	ace.require('ace/ext/language_tools')
 	var e = ace.edit(document.querySelector('.editor'))
 	e.$blockScrolling = Infinity;
 	e.setShowPrintMargin(false);
 	e.getSession().setMode('ace/mode/markdown');
 	e.setAutoScrollEditorIntoView(true);
 	e.setOption("wrap", true);
 	e.setOptions({
 		enableBasicAutocompletion: true,
 		enableSnippets: true,
 		enableLiveAutocompletion: false
 	});

 	e.configs = {
 			markdown: null
 		}
 		/**
 		 * -----------------------------------------------------------------------
 		 *  For live render the markdown
 		 * ------------------------------------------------------------------------
 		 */
 	e.configs.markdown = document.querySelector('.markdown-body');
 	e.on('change', function() {
 		status(1);
 		e.configs.markdown.innerHTML = marked(e.getValue().trim());
 	})

 	/**
 	 * ------------------------------------------------------------------------
 	 * Status
 	 * ------------------------------------------------------------------------
 	 */

 	function status(changed) {

 		if (changed && !commandSave.classList.contains('careful')) {
 			commandSave.classList.add('careful');
 		} else {
 			commandSave.classList.contains('careful') && commandSave.classList.remove('careful');
 		}

 	}

 	/**
 	 * ------------------------------------------------------------------------
 	 * fetch the note from the server by the id
 	 * ------------------------------------------------------------------------
 	 */
 	function getContent(id) {
 		ajax.fetch("/query-one", {
 			data: JSON.stringify({
 				id: id
 			})
 		}).then(function(v) {
 			// a hack for parse the json string to object
 			var data = new Function('return ' + v)();
 			e.setValue(data.content);
 			document.body.setAttribute('data-binding', data._id);
 			document.querySelector('title').innerHTML = data.title;
 		}, function() {
 			$log.e(arguments);
 		});
 	}

 	/**
 	 * ------------------------------------------------------------------------
 	 *   Helper for get and replace the selected text in the editor
 	 * ------------------------------------------------------------------------
 	 */
 	function selectedText() {
 		return e.session.getTextRange(e.getSelectionRange())
 	}

 	function replaceSelectedText(str) {
 		e.session.replace(e.getSelectionRange(), str);
 	}

 	/**
 	 * ------------------------------------------------------------------------
 	 *  Actually implement the command's logic
 	 * ------------------------------------------------------------------------
 	 */
 	var commands = {
 			new: function() {
 				if (e.configs.ask) {
 					return;
 				}
 				e.setValue("");
 				document.body.setAttribute('data-binding', -1)
 				document.querySelector('title').innerHTML = "New Note";
 			},
 			save: function() {
 				var content = e.getValue().trim();
 				var title = content.firstLine();
 				if (!title) {
 					Notifier.show("Shoud not to save the empty.", {
 						style: 'alert-danger'
 					});
 					return;
 				} else {
 					title = title.replace(/^# +/, '');
 				}
 				$log.d("the title to database=>", title);


 				var id = document.body.getAttribute('data-binding') || -1;
 				$log.d("the id to database =>", id);
 				var datas = null;
 				if (id !== -1) {
 					datas = {
 						id: id,
 						title: title,
 						content: content
 					}
 				} else {
 					datas = {
 						id: id,
 						title: title,
 						content: content,
 						create: Date.now()
 					}
 				}
 				$log.d("the datas to database=>", datas);

 				ajax.fetch("/put-note", {
 					data: JSON.stringify(datas)
 				}).then(function(v) {
 					status(0);
 					console.log("the di return by server is " + v);
 					if (+v !== 0) {
 						console.log("changed the body data-binding");
 						document.body.setAttribute('data-binding', v)
 					}
 					Notifier.show("Success.", {
 						style: 'alert-success'
 					});
 					document.querySelector('title').innerHTML = title;
 				}, function() {

 					Notifier.show("Failed to save the data", {
 						style: 'alert-danger'
 					});
 				})

 			},
 			head: function() {
 				var range = e.getSelectionRange().collapseRows();
 				var doc = e.session.doc;
 				var line = doc.getLine(range.start.row)
 				if (/^#* /.test(line)) {
 					doc.insertInLine({
 						row: range.start.row,
 						column: 0
 					}, "#");
 				} else {
 					doc.insertInLine({
 						row: range.start.row,
 						column: 0
 					}, "# ");
 				}
 			},
 			bold: function() {
 				var str = selectedText();
 				if (/^\s*\*\*.+\*\*\s*$/.test(str)) {
 					str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, function(match, g) {
 						return g;
 					});
 				} else {
 					str = " **" + str.trim() + "** "
 				}
 				replaceSelectedText(str);
 			},
 			italic: function() {
 				var str = selectedText();
 				if (/^\s*\*.+\*\s*$/.test(str)) {
 					str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, function(match, g) {
 						return g;
 					});
 				} else {
 					str = " *" + str.trim() + "* "
 				}
 				replaceSelectedText(str);
 			},
 			code: function() {
 				var str = selectedText();
 				if (str.trim()) {
 					if (/\n/.test(str)) {
 						str = "```\n" + str.trim() + "\n```\n";
 					} else {
 						str = " `" + str.trim() + "` ";
 					}
 				} else {
 					str = "\n```\n\n```\n";
 				}
 				replaceSelectedText(str);
 			},
 			fmtToarray: function() {
 				var str = selectedText();
 				str = str.replace(/[\"\']/g, function(m) {
 					return "\\" + m;
 				})
 				str = "[\"" + str.split('\n').join("\",\n\"") + "\"]";

 				replaceSelectedText(str);
 			},
 			preview: function() {
 				var viewer = document.querySelector('.editor-preview');
 				if (viewer.classList.contains('full-width')) {
 					document.querySelector('.editor').style.display = 'block';
 					viewer.classList.remove('full-width')
 				} else {
 					document.querySelector('.editor').style.display = 'none';
 					viewer.classList.add('full-width');
 				}
 			},
 			insertLink: function() {
 				var str = selectedText();
 				str = "[_]()".fmt(str.trim())
 				$log.d(str);
 				replaceSelectedText(str);
 			},
 			bulleted: function() {
 				var range = e.getSelectionRange().collapseRows();
 				var doc = e.session.doc;
 				for (var row = range.start.row; row <= range.end.row; row++)
 					doc.insertInLine({
 						row: row,
 						column: 0
 					}, "* ");
 			},
 			numeric: function() {
 				var range = e.getSelectionRange().collapseRows();
 				var doc = e.session.doc;
 				var i = 1;
 				for (var row = range.start.row; row <= range.end.row; row++) {
 					doc.insertInLine({
 						row: row,
 						column: 0
 					}, i + ". ");
 					i++;
 				}
 			},
 			removeEmpty: function() {
 				var str = selectedText().split('\n');
 				str = str.filter(function(v) {
 					return v.trim()
 				})

 				replaceSelectedText(str.join('\n'));
 			},
 			blockquote: function() {
 				var str = selectedText().split('\n');
 				replaceSelectedText(">" + str.join('\n>\n>'));
 			}

 		}
 		/**
 		 * ------------------------------------------------------------------------
 		 *  'cmd' is a array for hold the command objects  
 		 * ------------------------------------------------------------------------
 		 */
 	var cmd = [{
 		name: "new",
 		exec: commands.new
 	}, {
 		name: "save",
 		bindKey: {
 			win: "F5"
 		},
 		exec: commands.save
 	}, {
 		name: "head",
 		bindKey: {
 			win: "F1"
 		},
 		exec: commands.head
 	}, {
 		name: "bold",
 		bindKey: {
 			win: "F3"
 		},
 		exec: commands.bold
 	}, {
 		name: "insertLink",
 		bindKey: {
 			win: "F4"
 		},
 		exec: commands.insertLink
 	}, {
 		name: "italic",
 		exec: commands.italic
 	}, {
 		name: "code",
 		bindKey: {
 			win: "F2"
 		},
 		exec: commands.code
 	}, {
 		name: "preview",
 		bindKey: {
 			win: "F11"
 		},
 		exec: commands.preview
 	}, {
 		name: "fmtToarray",
 		exec: commands.fmtToarray
 	}, {
 		name: 'bulleted',
 		exec: commands.bulleted
 	}, {
 		name: 'numeric',
 		exec: commands.numeric
 	}, {
 		name: 'removeEmpty',
 		exec: commands.removeEmpty
 	}, {
 		name: 'blockquote',
 		exec: commands.blockquote
 	}]


 	/**
 	 * ------------------------------------------------------------------------
 	 * loop the 'cmd' and push the commands to the editor object
 	 * ------------------------------------------------------------------------
 	 */
 	var l = cmd.length;
 	for (; l--;) {
 		e.commands.addCommand(cmd[l])
 	}
 	/**
 	 * ------------------------------------------------------------------------
 	 *  find the dom which has the '.comand' classname
 	 *  and register the click event with a hanlder which mapping to the commands by 
 	 *  the 'data-binding' attribute
 	 * ------------------------------------------------------------------------
 	 */
 	function bindCommands() {
 		var btn = document.querySelectorAll(".command");
 		var l = btn.length;
 		while (l--) {
 			btn[l].addEventListener('click', function(ev) {
 				e.execCommand(ev.currentTarget.getAttribute('data-binding'))
 			})
 		}

 	}
 	bindCommands();
 	e.getContent = getContent;
 	return e;
 }());


var Notifier = (function() {

	var notifier = {
		template: [
			"		<div>",
			"_",
			"		</div>",

		],
		defaults: {
			style: 'alert-warning',
			duration: 2000,
			offsetTop: 30
		},
		timeout: null,
		showing: 0,
		animationDuration: 500,
		instance: null

	}

	function init() {
		var n = document.createElement('div');
		n.className = "notify"
		notifier.instance = n;
		document.body.appendChild(n);
	}

	function show(message, options) {
		options = options || {};
		if (notifier.showing) {
			hide()
		}
		notifier.showing = 1;
		extend(notifier.defaults, options);


		var n = notifier.instance;
		n.innerHTML = notifier.template.join("\n").fmt(message);
		
		// var throttle = notifier.defaults.offsetTop;
		// var offset = window.innerHeight - (throttle * 2);
		// var step = Math.ceil(offset / (notifier.animationDuration / 25));
		// $log.d("offset", offset, throttle, step)
		n.classList.add(notifier.defaults.style);
		//n.style.opacity = 0;
		// var animation = function() {
		// 	// if (offset > throttle) {
		// 	// 	offset -= step;
		// 	// 	window.requestAnimationFrame(animation)
		// 	// }
		// 	// n.style.opacity = 1;
		// 	// n.style.top = offset + 'px'

		// 	n.style.top = '300px'
		// }
		// window.requestAnimationFrame(animation)
		//n.style.top = '30px'
		n.classList.add("show");
		// n.addEventListener("animationstart", function() {
		// 	console.log(arguments);
		// }, false);
		clearTimeout(notifier.timeout);
		notifier.timeout = setTimeout(hide, notifier.defaults.duration);
	}

	function hide() {
		clearTimeout(notifier.timeout);
		notifier.instance.classList.remove('show');
		notifier.showing = 0;
	}


	init();

	notifier.show = show;
	return notifier;
}());


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


