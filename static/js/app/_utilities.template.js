var $template = (function() {
	function Template() {
		this.delimiter = /{([a-zA-Z_\-0-9]+)}/g;

	}

	Template.prototype.multiLine = function(template, json) {
		var self = this;
		var line = function(data) {
			return template.replace(self.delimiter, function(m, g) {
				if (g.startsWith("-")) {
					g = g.slice(1);
					return data[g] ? '' : g;
				}
				return data[g] || '';
			})
		};


		var content = "";

		for (var index = 0, l = json.length; index < l; index++) {
			content += line(json[index]);
		}

		return content;
	}
	return new Template();
}());