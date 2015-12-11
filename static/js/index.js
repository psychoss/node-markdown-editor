var $ajax = (function() {
	var _ajax = {
		defaluts: {
			method: 'POST'
		}

	};

	function fetch(url, options) {
		options = options || {};
		$object.extend(_ajax.defaluts, options);
		return new Promise(function(resolve, reject) {


			var request = new XMLHttpRequest();
			console.log(_ajax.defaluts.method);
			request.open(_ajax.defaluts.method, url, true);
			request.onload = onload;
			request.onerror = onerror;
			//request.onprogress = onprogress;
			var data = _ajax.defaluts.data || '';
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

			// function onprogress(event) {
			// 	notify(event.loaded / event.total);
			// }
		});
	}

	function html(url) {
		return fetch(url, {
			method: 'GET'
		})
	}

	_ajax.fetch = fetch;
	_ajax.html = html;
	return _ajax;
}());


var $animation = (function() {

	var _ = {

	};

	function animate(ele, keyframe, duration) {
		if ('animate' in ele) {
			ele.animate(keyframe, duration);
		}
	}

	_.animate = animate;
	return _;


}());




var $array = (function() {

	var _array = {};

	function coalesce(array) {
		if (!array) {
			return array;
		}
		return array.filter(function(e) {
			return !!e
		});
	}

	function fill(length, element) {
		var result = []
		while (length-- > 0) {
			result.push(element);
		}
		return result;
	}

	_array.slice = [].slice;
	return _array;
}());


var $date = (function() {
	function since(timestamp) {
		var seconds = (new Date().getTime() - timestamp) / 1000;
		if (seconds < 60) {
			return "just now";
		}

		var minutes = seconds / 60;
		if (minutes < 60) {
			return Math.floor(minutes) === 1 ? "1 minute ago" : Math.floor(minutes) + "minutes ago";
		}

		var hours = minutes / 60;
		if (hours < 24) {
			return Math.floor(hours) === 1 ? "1 hour ago" : Math.floor(hours) + " hours ago";
		}

		var days = hours / 24;
		if (Math.floor(days) === 1) {
			return "yesterday";
		}

		if (days > 6 && days < 8) {
			return "a week ago"
		}

		if (days > 30 && days < 40) {
			return "a month ago"
		}

		return Math.floor(days) + " days ago";

	}

}());


var $hash = (function() {
	var _hash = {};


	function combine(value, currentHash) {
		// Ensure we stay within 31 bits.
		return (((currentHash << 5) + currentHash) + value) & 0x7FFFFFFF;
	}

	function computeMurmur2StringHashCode(key) {
		// 'm' and 'r' are mixing constants generated offline.
		// They're not really 'magic', they just happen to work well.
		var m = 0x5bd1e995;
		var r = 24;

		var start = 0;
		var len = key.length;
		var numberOfCharsLeft = len;

		// Initialize the hash to a 'random' value.
		var h = (0 ^ numberOfCharsLeft);

		// Mix 4 bytes at a time into the hash.  NOTE: 4 bytes is two chars, so we iterate
		// through the string two chars at a time.
		var index = start;
		while (numberOfCharsLeft >= 2) {
			var c1 = key.charCodeAt(index);
			var c2 = key.charCodeAt(index + 1);

			var k = c1 | (c2 << 16);

			k *= m;
			k ^= k >> r;
			k *= m;

			h *= m;
			h ^= k;

			index += 2;
			numberOfCharsLeft -= 2;
		}

		// Handle the last char (or 2 bytes) if they exist.  This happens if the original string had
		// odd length.
		if (numberOfCharsLeft === 1) {
			h ^= key.charCodeAt(index);
			h *= m;
		}

		// Do a few final mixes of the hash to ensure the last few bytes are well-incorporated.

		h ^= h >> 13;
		h *= m;
		h ^= h >> 15;

		return h;
	}


	function hashCode(str) {
		var hash = 0,
			i, chr, len;
		if (str.length == 0) return hash;
		for (i = 0, len = this.length; i < len; i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	_hash.hashCode = hashCode;
	return _hash;

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
		el.find = function(selector) {
			return el.querySelector(selector);
		}
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
		el.delete = function() {
			if (el.remove) {
				el.remove()
			} else {
				el.parentNode.removeChild(el);
			}
		}
		return el;
	}


}());


var $json = (function () {
	var _json = {}
	function parse(jsonstring) {
		return new Function('return ' + jsonstring)();
	}
	return _json;
} ());



var $log = (function() {
	var l = {}
	l.turnoff = 1;

	function d() {
		if (l.turnoff ^ 0)
			console.trace(" Debug: ", arguments);
	}

	function e() {
		if (l.turnoff ^ 0)
			console.error("Error:", arguments);
	}
	l.d = d;
	return l;
}());


var $math = (function() {

	var _math = {};

	function isEven(n) {
		return !(n & 1)
	}

	function isEqual(n, m) {
		return !(n ^ m)
	}

	function round(n) {
		return n + .5 | 0;
	}

	function truncate(n) {
		return ~~n;
	}

	return _math;
}());


var $object = (function() {

	var _object = {};

	function clone(obj) {
		if (!obj || typeof obj !== 'object') {
			return obj;
		}
		if (obj instanceof RegExp) {
			return obj;
		}
		var result = (Array.isArray(obj)) ? [] : {};
		Object.keys(obj).forEach(function(key) {
			if (obj[key] && typeof obj[key] === 'object') {
				result[key] = clone(obj[key]);
			} else {
				result[key] = obj[key];
			}
		});
		return result;
	}

	function extend(destination, source) {

		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				destination[key] = source[key];
			}
		}
	}

	_object.extend = extend;
	return _object;

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
	String.prototype.padLeft = function(length, c) {
		c = c || '0';
		var self = this;
		for (; self.length < length;) {
			self = c + self;
		}
		return self;
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

	String.prototype.escapeHTML = function() {
		var tagsToReplace = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;'
		};
		return this.replace(/[&<>]/g, function(tag) {
			return tagsToReplace[tag] || tag;
		});
	};

}());

var $string = (function() {

	var _string = {};

	function startsWith(str, prefix) {
		var length = prefix.length;
		if (length && length <= str.length) {
			return str.slice(0, length) === prefix;
		} else {
			return false;
		}
	}


	function repeat(s, n) {
		var r = "";
		while (true) {
			if (n & 1) r += s;
			n >>= 1;
			if (n === 0) return r;
			s += s;
		}
		return s;
	}


	function format(message, args) {
		var result;
		if (args.length === 0) {
			result = message;
		} else {
			result = message.replace(/\{(\d+)\}/g, function(match, rest) {
				var index = rest[0];
				return typeof args[index] !== 'undefined' ? args[index] : match;
			});
		}
		return result;
	}
	_string.format = format;
	_string.repeat = repeat;
	_string.startsWith = startsWith;
	return _string;
}());


var $type = (function() {

	var _type = {};

	function create(ctor, args) {
		var obj = Object.create(ctor.prototype);
		ctor.apply(obj, args);
		return obj;
	}

	function isString(str) {
		if (typeof(str) === 'string' || str instanceof String) {
			return true;
		}

		return false;
	}

	function isArray(array) {
		if (Array.isArray) {
			return Array.isArray(array);
		}

		if (array && typeof(array.length) === 'number' && array.constructor === Array) {
			return true;
		}

		return false;
	}

	function isObject(obj) {

		// Needed for IE8
		if (typeof obj === 'undefined' || obj === null) {
			return false;
		}

		return Object.prototype.toString.call(obj) === '[object Object]';
	}
	_type.isArray = isArray;
	_type.isObject = isObject;
	_type.isString = isString;
	_type.create = create;
	return _type;
}());


var $validator = (function() {
	var _validator = {};

	function url(value) {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
	}
	function path(value){
		return /^[\/\-_\. a-zA-Z0-9]+$/.test(value);
	}
	_validator.path=path;
	_validator.url = url;
	return _validator;

}());





;
(function() {
	function DropDown(parameters) {
		this.trigger = parameters.trigger;
		this.template = parameters.template;
		this.width = parameters.width;
		this.loadedCallback = parameters.loaded;
		this.loadImmediate = parameters.loadImmediate;
		this.init();
	}
	/**
	 * ------------------------------------------------------------------------
	 *  be carefully, the instances of this class will share the 'CONST' 
	 * ------------------------------------------------------------------------
	 */
	DropDown.prototype.CONST = {
		dropdown: '.dropdown',
		holder: 'dropdown-holder',
		style: [{
			"position": 'absolute',
			"box-sizing": 'border-box',
			"z-index": "21",
		}],
		gutter: 2,
		item: '.dropdown__menu-item',
		itemHover: 'dropdown__menu-item--hover'
	}

	DropDown.prototype.init = function() {

		this.showing = false;
		this.holder = document.createElement('div');
		document.body.appendChild(this.holder);
		//this.holder.setAttribute('class', this.CONST.holder);

		this.bindEvent();
		if (this.loadImmediate) {
			this.show();


		}
	}
	DropDown.prototype.bindEvent = function() {

		if (this.trigger) {
			var this_ = this;
			this.trigger.addEventListener('click', function(ev) {
				ev.stopImmediatePropagation();
				if (this_.showing) {
					this_.hide();
				} else {
					this_.show();

				}
			});
		}
	}
	DropDown.prototype.calculatePosition = function() {
		if (this.trigger) {
			var rts = this.trigger.getBoundingClientRect();
			var ot = rts.top + rts.height + this.CONST.gutter;
			this.holder.style.top = ot + 'px';
			var rth = this.holder.querySelector(this.CONST.dropdown).getBoundingClientRect();
			this.holder.style.left = (rts.left - rth.width + rts.width) + 'px'
			if (this.loadImmediate) {
				this.holder.style.display = 'none';
				this.showing = false;

			}
		}

	}
	DropDown.prototype.flatProperties = function(arr) {
		var r = "";
		var l = arr.length;
		for (; l--;) {
			for (var key in arr[l]) {
				r += key + ":" + arr[l][key] + ";"
			}
		}

		return r;
	}
	DropDown.prototype.applyStyle = function() {
		this.holder.setAttribute('style', this.flatProperties(this.CONST.style));

		if (this.width) {
			var dropdown = this.holder.querySelector(this.CONST.dropdown);
			if (dropdown) {
				dropdown.style.width = this.width + 'px';
			}
		}

	}
	DropDown.prototype.show = function() {

		if (this.loaded) {
			this.holder.style.display = 'block';
			this.showing = true;

		} else {
			this.fillTemplate();
			// var hover = function() {
			// 	var items = this.holder.querySelectorAll(this.CONST.item)
			// 	var i = items.length;
			// 	for (; i--;) {
			// 		items[i].addEventListener('mouseenter', function(ev) {
			// 			if (!ev.target.classList.contains(this.CONST.itemHover))
			// 				ev.target.classList.add(this.CONST.itemHover)
			// 		}.bind(this));
			// 		items[i].addEventListener('mouseleave', function(ev) {
			// 			if (ev.target.classList.contains(this.CONST.itemHover))
			// 				ev.target.classList.remove(this.CONST.itemHover)
			// 		}.bind(this));
			// 	}
			// }.bind(this);
			// var ok = function(text) {
			// 	this.loaded = true;
			// 	this.holder.innerHTML = text;
			// 	document.addEventListener('click', function() {
			// 		this.hide();
			// 	}.bind(this));
			// 	hover();
			// 	this.showing = true;
			// 	this.applyStyle();
			// 	this.calculatePosition();
			// 	if (this.loadedCallback) {
			// 		this.loadedCallback(this.holder);
			// 	}
			// }.bind(this);

			// $ajax.html(this.template).then(ok, function() {
			// 	console.log(arguments);
			// });
		}

	}
	DropDown.prototype.loadFromURL = function() {
		var ok = this.refreshContent.bind(this);
		$ajax.html(this.template).then(ok, function() {
			console.log(arguments);
		});
	}
	DropDown.prototype.refreshContent = function(text) {
		var self = this;

		var hover = function() {
			var items = self.holder.querySelectorAll(self.CONST.item);
			var i = items.length;
			for (; i--;) {
				items[i].addEventListener('mouseenter', function(ev) {
					if (!ev.target.classList.contains(self.CONST.itemHover))
						ev.target.classList.add(self.CONST.itemHover)
				});
				items[i].addEventListener('mouseleave', function(ev) {
					if (ev.target.classList.contains(self.CONST.itemHover))
						ev.target.classList.remove(self.CONST.itemHover)
				});
			}
		};

		self.loaded = true;
		self.holder.innerHTML = text;
		hover();
		document.addEventListener('click', function() {
			self.hide();
		});
		self.showing = true;
		self.applyStyle();
		self.calculatePosition();
		if (self.loadedCallback) {
			self.loadedCallback(self.holder);
		}

	}
	DropDown.prototype.fillTemplate = function() {
		if ($validator.path(this.template)) {
			this.loadFromURL();
		} else {
			this.refreshContent(this.template)
		}
	}
	DropDown.prototype.hide = function() {
		if (this.loaded) {
			this.holder.style.display = 'none';
			this.showing = false;
		}
	}
	window.DropDown = DropDown;
}());


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
 	var e = ace.edit(document.querySelector('.editor'));

 	e.category = [];

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
 		} else if (!changed && commandSave.classList.contains('careful')) {
 			commandSave.classList.contains('careful') && commandSave.classList.remove('careful');
 		}

 	}

 	/**
 	 * ------------------------------------------------------------------------
 	 * fetch the note from the server by the id
 	 * ------------------------------------------------------------------------
 	 */
 	function getContent(id) {
 		$ajax.fetch("/query-one", {
 			method: 'POST',
 			data: JSON.stringify({
 				id: id
 			})
 		}).then(function(v) {
 			// a hack for parse the json string to object
 			var data = new Function('return ' + v)();
 			if (data.category) {
 				if (!e.category.length)
 					e.category = document.querySelectorAll('.dropdown__menu-item.category');
 				console.log(e.category);
 				var i = e.category.length;

 				for (; i--;) {
 					if (e.category[i].innerText.trim() === data.category) {
 						e.category[i].classList.add('is-selected');
 					}
 				}
 			}
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

 				var category = document.querySelector('.category.is-selected');
 				if (category) {
 					category = category.innerText.trim();
 				} else {
 					category = 'Notes';
 				}

 				if (id !== -1) {
 					datas = {
 						id: id,
 						title: title,
 						content: content,
 						category: category
 					}
 				} else {
 					datas = {
 						id: id,
 						title: title,
 						content: content,
 						category: category,
 						create: Date.now()

 					}
 				}
 				$log.d("the datas to database=>", datas);

 				$ajax.fetch("/put-note", {
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
 					if (document.querySelector('title').innerHTML !== title) {
 						document.querySelector('title').innerHTML = title;
 						$ajax.fetch("/query-all").then(function(v) {
 							SlideLayout.refresh(v);
 						}, function() {});
 					}
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
 			},
 			customList: function() {
 				var str = selectedText().trim().split('\n');
 				var c = "";
 				var line = "";
 				console.log(str);
 				for (var l = 0; l < str.length; l++) {
 					line = str[l]
 					console.log(line);
 					if (l % 2 === 0) {
 						c += "- **" + line + "**\n\n"
 					} else {
 						c += " " + line + "\n\n"
 					}
 				}

 				replaceSelectedText(c);
 			},
 			shortDate: function() {
 				var date = new Date
 				var ds = date.toJSON().split(/[a-z]/i)[0]
 				var str = selectedText()
 				replaceSelectedText(str + ds);
 			},
 			hr: function() {
 				var str = selectedText()
 				replaceSelectedText(str + '\n---\n');
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
 	}, {
 		name: 'customList',
 		exec: commands.customList
 	}, {
 		name: 'shortDate',
 		exec: commands.shortDate
 	}, {
 		name: 'hr',
 		exec: commands.hr
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
 	function bindCommands(btn) {

 		var l = btn.length;
 		while (l--) {
 			btn[l].addEventListener('click', function(ev) {
 				e.execCommand(ev.currentTarget.getAttribute('data-binding'))
 			})
 		}

 	}
 	bindCommands(document.querySelectorAll(".command"));
 	e.bindCommands = bindCommands;
 	e.getContent = getContent;
 	return e;
 }());


var $Modal = (function() {

  function Modal(ele) {
    if (!ele) return;
    this.ele = ele;

    this.init()
  }
  Modal.prototype.CONST = {
    DURATION: 500,
    status: 0,
    closeButton: '.btn-close'
  }
  Modal.prototype.init = function() {
    this.close = this.ele.querySelector(this.CONST.closeButton);
    this.bindEvent();
  }
  Modal.prototype.bindEvent = function() {
    if (this.close) {
      this.close.addEventListener('click', this.hide.bind(this))
    }
  }
  Modal.prototype.hide = function() {
    var this_ = this;
    this.CONST.status = 0;
    this.animate({
      easing: TWEEN.Easing.Quadratic.Out,
      duration: 350,
      mapFrom: {
        top: 50
      },
      mapTo: {
        top: -this_.ele.clientHeight * 1.2
      },
      onupdate: function() {
        this_.ele.style.top = this.top + "px"
      }
    })
  }
  Modal.prototype.show = function() {

    var this_ = this;
    if (this.CONST.status) {
      return;
    }
    this.CONST.status = 1;
    this.animate({
      easing: TWEEN.Easing.Quadratic.In,
      duration: 350,
      mapFrom: {
        top: -this_.ele.clientHeight * 1.2
      },
      mapTo: {
        top: 50
      },
      onupdate: function() {
        this_.ele.style.top = this.top + "px"
      }
    })
  }
  Modal.prototype.animate = function(animateDatas) {

    var duration = animateDatas.duration || this.CONST.DURATION;
    var easing = animateDatas.easing || TWEEN.Easing.Linear.None;

    var onComplete = animateDatas.oncomplete || function() {
      TWEEN.removeAll();
    }
    var tween = new TWEEN.Tween(animateDatas.mapFrom)
      .to(animateDatas.mapTo, duration)
      .onUpdate(animateDatas.onupdate)
      .onComplete(onComplete)
      .easing(easing)
      .start();

    requestAnimationFrame(animate);

    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
  }
  Modal.prototype.find = function(selector) {
    return this.ele.querySelector(selector);
  }
  return Modal;
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
		$object.extend(notifier.defaults, options);


		var n = notifier.instance;
		n.innerHTML = notifier.template.join("\n").fmt(message);

		// var throttle = notifier.defaults.offsetTop;
		// var offset = window.innerHeight - (throttle * 2);
		// var step = Math.ceil(offset / (notifier.animationDuration / 25));
		// $log.d("offset", offset, throttle, step)
		n.setAttribute('type', notifier.defaults.style);
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


var $slideLayout = (function() {


	function SlideLayout() {
		this.init();
	}

	SlideLayout.prototype.init = function() {
		this.ele = document.querySelector('.slide-layout .menu');
		var toggleButton = document.querySelector('.header-toggle-btn');
		var slideLayout = $(document.querySelector('.slide-layout'));

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
				var c = searchInput.value;
				if (c.trim())
					self.filter(c);
				else {
					var ls = note_list.children;
					for (l = ls.length; l--;) {
						ls[l].setAttribute('style', '');
					}
				}
			}, 50);
		})

	}



	SlideLayout.prototype.filter = function(v) {
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
	$slideLayout.refreshDefault();
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
	})
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


