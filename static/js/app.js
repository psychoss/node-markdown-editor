'use strict';






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
