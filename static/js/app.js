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
let commands = new Commands(editor, dlgProxy,_);
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

let menu = new MenuProxy(document.querySelector('.menu'),editor,_)
window.addEventListener('contextmenu', (ev) => {
	if (ev.target.type === 'textarea') {
		ev.preventDefault();
		menu.show(ev.x, ev.y);
	}
})


new Toolbar(_);
let dn=document.querySelector('.dropdown-note');
let dm=document.querySelector('.dropdown-more');

new Dropdown(dm,_);
new Dropdown(dn,_);



new DataDealer(editor,_);
new SearchTitle(_);
