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