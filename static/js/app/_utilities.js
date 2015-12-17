var $ = (function() {
	var _$ = function $(element) {

		if (typeof element === 'string') {
			if (/(^| )#[a-z0-9\-_]+$/i.test(element)) {
				element = document.getElementById(element);
			} else if ("querySelector" in document) {
				element = document.querySelector(element);
			}
		} else if (Object.prototype.toString.call(element).indexOf("HTML") !== -1) {
			element = element;
		} else {
			throw new Error("invalide selector or DOM object");
		}
		//
		element.on = function(event, fn) {
				element.addEventListener ? element.addEventListener(event, fn, false) : element.attachEvent("on" + event, fn);
			}
			//
		element.removeClass = function(className) {

			if (~element.className.indexOf(className)) {
				element.className = element.className.slice(0, element.className.indexOf(className)) + element.className.slice(element.className.indexOf(className) + className.length);
			}
			// if("classList" in element && element.classList.contains(className)){
			// 	element.classList.remove(className)
			// }else{
			// 	element.className.split(' ').reduce
			// }
			// var r=new RegExp("(^| )".concat(className).concat("( |$)"))

		}
		element.addClass = function(className) {
			if (!~element.className.indexOf(className)) {
				element.className = element.className.trim().concat(" ").concat(className);
			}
			// if ("classList" in element && !element.classList.contains(className)) {
			// 	element.classList.add(className)
			// } else {
			// 	element.className.split(' ').reduce
			// }
		}
		element.html = function(value) {
			if (value === undefined && element.nodeType === 1) {
				return element.innerHTML
			} else if (typeof value === 'string') {
				element.innerHTML = value;
			}
		}
		return element;

	}

	return _$;
}());


// var $ = (function() {
// 	return function $(id) {
// 		var el = 'string' == typeof id ? document.getElementById(id) : id;

// 		el.on = function(event, fn) {
// 			if ('ready' == event) {
// 				event = window.attachEvent ? "load" : "DOMContentLoaded";
// 			}
// 			el.addEventListener ? el.addEventListener(event, fn, false) : el.attachEvent("on" + event, fn);
// 		};

// 		el.all = function(selector) {
// 			return $(el.querySelectorAll(selector));
// 		};
// 		el.find = function(selector) {
// 			return el.querySelector(selector);
// 		}
// 		el.each = function(fn) {
// 			for (var i = 0, len = el.length; i < len; ++i) {
// 				fn($(el[i]), i);
// 			}
// 		};

// 		el.getClasses = function() {
// 			return this.getAttribute('class').split(/\s+/);
// 		};

// 		el.addClass = function(name) {
// 			var classes = this.getAttribute('class');
// 			if (classes.indexOf(name) === -1) {
// 				el.setAttribute('class', classes ? classes + ' ' + name : name);
// 			}
// 		};

// 		el.removeClass = function(name) {
// 			var classes = this.getAttribute('class');
// 			if (~classes.indexOf(name)) {
// 				el.setAttribute('class', classes ? classes.replace(name, "").trim() : name);
// 			}
// 		};
// 		el.css = function(name, value) {
// 			return value ? el.style[name] = value : el.style[name];
// 		}
// 		el.attr = function(name, value) {
// 			return value ? el.setAttribute(name, value) : el.getAttribute(name);
// 		}
// 		el.html = function(value) {
// 			return value ? el.innerHTML = value : el.innerHTML;
// 		}
// 		el.delete = function() {
// 			if (el.remove) {
// 				el.remove()
// 			} else {
// 				el.parentNode.removeChild(el);
// 			}
// 		}
// 		return el;
// 	}


// }());