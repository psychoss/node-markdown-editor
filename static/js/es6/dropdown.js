class Dropdown {
	constructor(ele, _) {
		this.config = {
		}
		this.ele = ele;
		this._ = _;
		this.init()
	}
	init() {
		let self = this;
		let target = document.getElementById(self._.atr(self.ele, 'data-target'));

		self._.click(target, (event) => {
			event.stopImmediatePropagation();

			self.calculate(target, self.ele, self._);
		})
		if (!self.ele.classList.contains('no-clear')) {
			document.addEventListener('click', () => {
				self._.removeClass(self.ele, "is-active");
			})
		}
		this.bindCloseButton(this.ele,this._);
	}
	calculate(target, ele, _) {
		let rts = _.boundingRect(target);
		ele.style.top = (rts.top + rts.height) + 'px';
		let dts = _.boundingRect(ele);
		ele.style.left = (rts.left - dts.width + rts.width) + 'px';
		_.toggleClass(ele, "is-active");
	}
	bindCloseButton(ele,_) {
		let btn=_.qs('.btn-close')
		if(btn){
			_.click(btn,()=>{
				_.removeClass(ele,'is-active');
			})
		}
	
	}
}


// class Dropdown {
// 	constructor(_) {
// 		this.config = {};
// 		this.config.className = ".dropdown"
// 		this.config.activeClass = ".js-dropdown";
// 		this.config.isactive = 'is-active';
// 		this.config.closeButton = '.btn-close';
// 		this._ = _;
// 		this.init();
// 		this.close();
// 	}
// 	init() {
// 		let buttons = document.querySelectorAll(this.config.activeClass)
// 		let length = buttons.length;
// 		let this_ = this;
// 		while (length--) {
// 			buttons[length].addEventListener('click', (event) => {
// 				let dropdown = this_._.atr(event.currentTarget, 'data-bind');
// 				let rts = this_._.boundingRect(event.currentTarget);
// 				if (dropdown) {
// 					dropdown = document.getElementById(dropdown);
// 					//this_.bindClear(dropdown);
// 					dropdown.style.top = (rts.top + rts.height) + 'px';
// 					let dts = this_._.boundingRect(dropdown);
// 					dropdown.style.left = (rts.left - dts.width + rts.width) + 'px';
// 					this_._.toggleClass(dropdown, this_.config.isactive);
// 					this_.bindCloseButton(dropdown);
// 				}
// 			})
// 		}
// 	}
// 	close() {
// 		let items = document.querySelectorAll(this.config.className + '>a');
// 		let cb = (ev) => {
// 			this._.removeClass(ev.currentTarget.parentNode, this.config.isactive);
// 		}
// 		let callback = ((v) => {
// 			this._.click(v, cb);
// 		}).bind(this);
// 		this._.loop(items, callback);
// 	}
// 	bindClear(dropdown,obj) {
// 		let clear = (() => {
// 			obj._.removeClass(dropdown, obj.config.isactive);
// 		}).bind(this)
// 		document.addEventListener('click', clear);
// 	}
// 	bindCloseButton(dropdown) {
// 		let closeButton = this._.qs(dropdown, this.config.closeButton);
// 		if (closeButton) {
// 			closeButton.dropdown = dropdown;
// 			let self = this;
// 			this._.click(closeButton, (ev) => {
// 				self._.removeClass(ev.currentTarget.dropdown, this.config.isactive);
// 			})
// 		}
// 	}
// }

/**
 * ------------------------------------------------------------------------
 * 
 * ------------------------------------------------------------------------
 */