;
(function() {

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { /**/ }

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	var extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	}
	window.extend = extend;
}());
/**
 * ------------------------------------------------------------------------
 *  String Extends
 * ------------------------------------------------------------------------
 */
(function() {
	String.prototype.firstLine = function() {
		if (this) {
			var arr = this.split('\n');
			var l = arr.length;
			for (var index = 0; index < l; index++) {
				if (arr[index].trim()) {
					return arr[index];
				}
			}
		}
		return void 0;
	}

}());
/**
 * ------------------------------------------------------------------------
 *  Array Extends
 * ------------------------------------------------------------------------
 */
(function() {
	window.log = console.log;
	window.$slice = [].slice;
	window.$holder = {
		title: document.querySelector('title')
	};
	window.$timeago = function(val) {
		val = 0 | (Date.now() - val) / 1000;
		var unit, length = {
				second: 60,
				minute: 60,
				hour: 24,
				day: 7,
				week: 4.35,
				month: 12,
				year: 10000
			},
			result;

		for (unit in length) {
			result = val % length[unit];
			if (!(val = 0 | val / length[unit]))
				return result + ' ' + (result - 1 ? unit + 's' : unit);
		}
	}
}());