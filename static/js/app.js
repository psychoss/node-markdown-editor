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
		this._bind('.editor-head-btn', () => {
			editor.execCommand("addHead");
		});
		this._bind('.editor-bold-btn', () => {
			editor.execCommand("bold");
		});
		this._bind('.editor-italic-btn', this.commands.italic.bind(this.commands));
		this._bind('.editor-code-btn', () => {
			editor.execCommand("addCode");
		});
		this._bind('.editor-sort-btn', this.commands.sort.bind(this.commands));
		this._bind('.editor-indent-btn', this.commands.indent.bind(this.commands));
		this._bind('.editor-bulleted-btn', this.commands.bulleted.bind(this.commands));
		this._bind('.editor-numeric-btn', this.commands.numeric.bind(this.commands));
		this._bind('.editor-undo-btn', this.commands.undo.bind(this.commands));
		this._bind('.editor-redo-btn', this.commands.redo.bind(this.commands));
		this._bind('.editor-fmt-2-json', this.commands.fmt2json.bind(this.commands));
		this._bind('.editor-hr-btn', this.commands.hr.bind(this.commands));

		this._bind('.editor-insert-link-btn', this.commands.insertLink.bind(this.commands));

		this._bind('.editor-save-btn', () => {
			editor.execCommand('save');
		});
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

let menu = new MenuProxy(document.querySelector('.menu'))
window.addEventListener('contextmenu', (ev) => {
	if (ev.target.type === 'textarea') {
		ev.preventDefault();
		menu.show(ev.x, ev.y);
	}
})

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

/**
 * ------------------------------------------------------------------------
 * 
 * ------------------------------------------------------------------------
 */

class DataDealer {
	constructor(editor) {
		this.editor = editor;
		this.config = {
			triggerNote: '.note-item-title',
			nodeItemsHolder: '#toolbar-notes .fixed',
			noteItemTemplate: "<div class=\"note-item\" ><div class=\"note-item-content\"><div class=\"note-item-title\" data-bind=\"{_id}\">{title}</div><div class=\"note-item-date\">{modified}</div></div></div>\n"
		}
		this.toFirst();
	}
	toFirst() {
		let this_ = this;
		Ajax.to('/query-all').then((t) => {
			let datas = JSON.parse(t);
			this_.buildItems(datas);
		})
	}
	buildItems(datas) {
		let content = "";
		let template = this.config.noteItemTemplate;;
		datas.forEach(function (v) {
			let line = template;
			Object.keys(v).forEach(function (k) {

				let re = new RegExp("{" + k + "}", 'g')
				let data = v[k];
				if (k === 'modified') {
					data = window.$timeago(parseInt(v[k], 10))+' AGO'
				}
				line = line.replace(re, data);
			})
			content += line;
		})
		Abstract.beforeend(Abstract.qs(this.config.nodeItemsHolder), content);
		this.bindTriggerNote()
	}
	bindTriggerNote() {
		let notes = Abstract.qsa(this.config.triggerNote);
		if (!notes) return;

		let this_ = this;
		notes = window.$slice.call(notes, 0);
		notes.forEach((v) => {
			Abstract.click(v, (ev) => {
				var id = Abstract.atr(v, 'data-bind');
				if (id) {
					this_.bindTriggerTo(id, ev);
				}
			})
		})
	}
	bindTriggerTo(id, ev) {
		var this_ = this;
		Ajax.to('/query-one', {
			body: JSON.stringify({
				id: id
			})
		}).then((t) => {
			this_.closeNodePanel(ev);
			try {
				let datas = JSON.parse(t);
				this_.content(datas);
			} catch (error) {

			}
		})
	}
	closeNodePanel(ev) {
		let p = Abstract.qp(ev.target, 'dropdown')
		if (p) {
			Abstract.removeClass(p, 'is-active');
		}
	}
	content(datas) {
		this.editor.setValue(datas.content);
		window.note_id = datas._id;
		Abstract.html(window.$holder.title, datas.title);
	}
}

new DataDealer(editor);

// Ajax.to('/query-all')
// var bindNotes = function () {
// 	var notes = document.querySelectorAll('')
// 	notes = window.$slice.call(notes, 0);
// 	if (notes) {
// 		notes.forEach(function (v) {
// 			Abstract.click(v, function () {

// 			})
// 		})
// 	}
// }