'use strict';

class MenuProxy {
	constructor(ele) {
		this.ele = ele;
		this.config = {
			isactive: 'is-active'
		}
		this._bindClose();
	}
	show(x, y) {
		this.ele.style.top = `${y}px`;
		this.ele.style.left = `${x}px`;
		Abstract.addClass(this.ele, this.config.isactive);
		this.ele.addEventListener('blur', this.blur.bind(this));
	}
	_bindClose() {
		let items = document.querySelectorAll('li>a');
		items = window.$slice.call(items, 0)
		let this_ = this;

		items.forEach((v) => {
			Abstract.click(v, () => {
				this_._close();

			})
		});

		Abstract.click(document, () => {
			this_._close();
		})
	}
	_close() {
		Abstract.removeClass(this.ele, this.config.isactive);

	}
	blur() {
		Abstract.removeClass(this.ele, 'is-active');
	}
}