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
		return el;
	}


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