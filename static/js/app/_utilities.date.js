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