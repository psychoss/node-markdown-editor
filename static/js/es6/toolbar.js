    /**
	 * ------------------------------------------------------------------------
	 * 
	 * ------------------------------------------------------------------------
	 */
class Toolbar {
	constructor(_) {
		this.config = {};
		this.config.activeClass = ".js-button-active";
		this.config.isactive = 'is-active';
		this._=_;
		this.activeStatus();
	}
	activeStatus() {
		let buttons = document.querySelectorAll(this.config.activeClass)
		let length = buttons.length;
		let self=this;
		while (length--) {
			buttons[length].addEventListener('click', (event) => {
			self._.toggleClass(event.currentTarget, this.config.isactive);
			})
		}
	}
}