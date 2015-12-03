'use strict';

class SearchTitle {
	constructor(_) {
		this.config = {
			contentSelector: '#toolbar-notes .fixed',
			content: null,
			input: '#search-title'
		}
		this._ = _;
		this.init();
	}
	init() {
		this.content = this._.qs(this.config.contentSelector)
		this.input = this._.qs(this.config.input);

		this._bindInput();
	}

	_bindInput() {
		this.input.addEventListener('input', this._doSearch.bind(this));
	}
	_doSearch() {
		if (this.searching) {
			return;
		}
		this.searching = 1;
		let s = this.input.value.trim().toLocaleLowerCase();
		if (this.searched && !s) {
			let arr = window.$slice.call(this.content.children, 0);
			arr.forEach((v) => {
				v.style.display = "";
			})
			this.searched = 0;
		} else if (s) {
			let arr = window.$slice.call(this.content.children, 0);
			let this_ = this;
			arr.forEach((v) => {
				let c = this_._.qs(v, '.note-item-title').innerHTML.toLocaleLowerCase();
				if (c.indexOf(s) === -1) {
					v.style.display = "none";
				}
			})
			this.searched = 1;
		}
		this.searching = 0;
	}
}