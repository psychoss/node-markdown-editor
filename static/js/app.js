'use strict';


class BindElement {
	constructor(commands) {
		this.commands = commands;
		this.init();
	}
	_bind(className, callback, eventType) {
		eventType = eventType || 'click';
		let ele = document.querySelector(className);
		if (ele) {
			ele.addEventListener('click', callback);
		}
	}
	init() {


		this._bind('.editor-new-btn', this.commands.new.bind(this.commands));
		this._bind('.editor-bold-btn', this.commands.bold.bind(this.commands));
		this._bind('.editor-italic-btn', this.commands.italic.bind(this.commands));
		this._bind('.editor-code-btn', this.commands.code.bind(this.commands));
		this._bind('.editor-sort-btn', this.commands.sort.bind(this.commands));
		this._bind('.editor-indent-btn', this.commands.indent.bind(this.commands));
		this._bind('.editor-bulleted-btn', this.commands.bulleted.bind(this.commands));
		this._bind('.editor-numeric-btn', this.commands.numeric.bind(this.commands));
		this._bind('.editor-undo-btn', this.commands.undo.bind(this.commands));
		this._bind('.editor-redo-btn', this.commands.redo.bind(this.commands));
		this._bind('.editor-fmt-2-json', this.commands.fmt2json.bind(this.commands));

		this._bind('.editor-save-btn', this.commands.save.bind(this.commands));
		let this_ = this;
		this._bind('.editor-insert-image-btn', () => {
			this_.commands.insertImg.bind(this_.commands)().then((dlg) => {

				dlg.showModal();
			})
		});

	}
}




let dlgProxy = new DialogProxy();
let commands = new Commands(editor, dlgProxy);
new BindElement(commands);


/**
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * DOM
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 *  Toolbar
 * ------------------------------------------------------------------------
 */
class Toolbar {
	constructor() {
		this.config = {};
		this.config.activeClass = ".js-button-active";
		this.config.isactive = 'is-active';
		this.activeStatus();
	}
	activeStatus() {
		let buttons = document.querySelectorAll(this.config.activeClass)
		let length = buttons.length;
		while (length--) {
			buttons[length].addEventListener('click', (event) => {
				Abstract.toggleClass(event.currentTarget, this.config.isactive);
			})
		}
	}
}
/**
 * ------------------------------------------------------------------------
 *  Toolbar
 * ------------------------------------------------------------------------
 */
class Dropdown {
	constructor() {
		this.config = {};
		this.config.className = ".dropdown"
		this.config.activeClass = ".js-dropdown";
		this.config.isactive = 'is-active';
		this.config.closeButton = '.btn-close';
		this.init();
		this._close();
	}
	init() {
		let buttons = document.querySelectorAll(this.config.activeClass)
		let length = buttons.length;
		let this_ = this;
		while (length--) {
			buttons[length].addEventListener('click', (event) => {
				let dropdown = Abstract.atr(event.currentTarget, 'data-bind');
				let rts = Abstract.boundingRect(event.currentTarget);
				if (dropdown) {
					dropdown = document.getElementById(dropdown);
					dropdown.style.top = (rts.top + rts.height) + 'px';
					let dts = Abstract.boundingRect(dropdown);
					dropdown.style.left = (rts.left - dts.width + rts.width) + 'px';
					Abstract.toggleClass(dropdown, this_.config.isactive);
					this_.bindCloseButton(dropdown);
				}
			})
		}
	}
	_close() {
		let items = document.querySelectorAll(this.config.className + '>a');
		let l = items.length;
		let this_ = this;
		while (l--) {
			items[l].addEventListener('click', (event) => {
				Abstract.removeClass(event.currentTarget.parentNode, this_.config.isactive);
			})

		};

	}
	bindCloseButton(dropdown) {
		let closeButton = Abstract.qs(dropdown, this.config.closeButton);
		if (closeButton) {
			closeButton.dropdown = dropdown;

			Abstract.click(closeButton, (ev) => {
				Abstract.removeClass(ev.currentTarget.dropdown, this.config.isactive);
			})
		}
	}
}
/**
 * ------------------------------------------------------------------------
 *  Initialize DOM
 * ------------------------------------------------------------------------
 */

new Toolbar();
new Dropdown();