'use strict';
;
(function() {

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { /**/ }

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	var extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	}
	window.extend = extend;
}());
/**
 * ------------------------------------------------------------------------
 *  String Extends
 * ------------------------------------------------------------------------
 */
(function() {
	String.prototype.firstLine = function() {
		if (this) {
			var arr = this.split('\n');
			var l = arr.length;
			for (var index = 0; index < l; index++) {
				if (arr[index].trim()) {
					return arr[index];
				}
			}
		}
		return void 0;
	}

}());
/**
 * ------------------------------------------------------------------------
 *  Array Extends
 * ------------------------------------------------------------------------
 */
(function() {
	window.log = console.log;
	window.$slice = [].slice;
	window.$holder = {
		title: document.querySelector('title')
	};
	window.$timeago = function(val) {
		val = 0 | (Date.now() - val) / 1000;
		var unit, length = {
				second: 60,
				minute: 60,
				hour: 24,
				day: 7,
				week: 4.35,
				month: 12,
				year: 10000
			},
			result;

		for (unit in length) {
			result = val % length[unit];
			if (!(val = 0 | val / length[unit]))
				return result + ' ' + (result - 1 ? unit + 's' : unit);
		}
	}
}());



class _ {
	/**
	 * ------------------------------------------------------------------------
	 *  ClassName
	 * ------------------------------------------------------------------------
	 */
	static addClass(ele, className) {
		if (ele.classList.contains(className)) return;
		ele.classList.add(className);
	}
	static removeClass(ele, className) {
		if (ele.classList.contains(className))
			ele.classList.remove(className);
	}
	static toggleClass(ele, className) {
		if (ele.classList.contains(className)) {
			ele.classList.remove(className);
		} else {
			ele.classList.add(className);
		}
	}
	static atr(ele, property, val) {
			if (val) {
				ele.setAttribute(property, val)
			} else {
				return ele.getAttribute(property)
			}
		}
		/**
		 * ------------------------------------------------------------------------
		 *  Dimensions
		 * ------------------------------------------------------------------------
		 */
		//The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
	static boundingRect(ele) {
			// return a object like:

			// ClientRect {}
			// bottom: 29
			// height: 24
			// left: 520
			// right: 546
			// top: 5
			// width: 26
			return ele.getBoundingClientRect();
		}
		/**
		 * ------------------------------------------------------------------------
		 * Event
		 * ------------------------------------------------------------------------
		 */
		/*Event.target
			A reference to the object that dispatched the event. It is different from event.currentTarget 
		when the event handler is called during the bubbling or capturing phase of the event.
		*/
		// Carefully dont add multi times.
	static click(ele, callback) {
		ele.addEventListener('click', callback);
	}

	/**
	 * ------------------------------------------------------------------------
	 *  Find
	 * ------------------------------------------------------------------------
	 */
	static qs(ele, selector) {
		if (selector) {
			return ele.querySelector(selector)
		} else {
			return document.querySelector(ele)
		}
	}
	static qsa(ele, selector) {
		if (selector) {
			return ele.querySelectorAll(selector)
		} else {
			return document.querySelectorAll(ele)
		}
	}
	static parent(ele) {
		return ele.parentNdoe;
	}
	static qp(ele, predict) {
			let p = ele.parentNode;
			while (p) {
				if (p.classList.contains(predict))
					return p;
				p = p.parentNode;
			}
		}
		/**
		 * ------------------------------------------------------------------------
		 * Content
		 * ------------------------------------------------------------------------
		 */

	static html(ele, value) {
			if (value) {
				ele.innerHTML = value;
			} else {
				return ele.innerHTML;
			}
		}
		/*
	'beforebegin'
Before the element itself.
'afterbegin'
Just inside the element, before its first child.
'beforeend'
Just inside the element, after its last child.
'afterend'
After the element itself.
	*/
	static afterend(ele, h) {
		ele.insertAdjacentHTML('afterend', h);
	}
	static beforeend(ele, h) {
		ele.insertAdjacentHTML('beforeend', h);
	}
	    /**
		 * ------------------------------------------------------------------------
		 * 
		 * ------------------------------------------------------------------------
		 */
		static loop(arr,callback){
			let l=arr.length;
			if(l>0){
				while(l--){
					callback(arr[l])
				}
			}
		}
}


    /**
     * ------------------------------------------------------------------------
     * 
     * ------------------------------------------------------------------------
     */

    class Ajax {
    	constructor() {


    	}
    	static defaults() {
    			//An options object containing any custom settings that you want to apply to the request. The possible options are:
    			// method: The request method, e.g., GET, POST.
    			// headers: Any headers you want to add to your request, contained within a Headers object or ByteString.
    			// body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
    			// mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
    			// credentials: The request credentials you want to use for the request: omit, same-origin, or include.
    			// cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.

    			let h = new Headers();
    			h.append('Content-Type', 'application/json');

    			return {
    				method: "POST",
    				headers: h
    			}
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * 
    		 * ------------------------------------------------------------------------
    		 */
    	static to(url, opt) {
    		var promise = new Promise((resolve, reject) => {
    			let data = {}
    			data = window.extend(data, Ajax.defaults(), opt);
    			var r = new Request(url);

    			// return function*(){
    			// 	yield fetch(r, data).then((rsp)=>{
    			// 		console.log(rsp);
    			// 		return rsp.text();
    			// 	},()=>{

    			// 	})
    			// }

    			fetch(r, data).then((rsp) => {
    				rsp.text().then((t) => {
    					resolve(t)
    				}, () => {
    					reject(arguments);
    				})
    			}, () => {
    				reject(arguments);
    			})
    		})
    		return promise;

    	}
    }


    /**
     * ------------------------------------------------------------------------
     * 
     * ------------------------------------------------------------------------
     */
    class Commands {
    	constructor(editor, dialogProxy, _) {
    		this.editor = editor;
    		this.dialogProxy = dialogProxy;
    		this._ = _;
    		this.init();
    	}
    	init() {

    		let cmd = [{
    			name: "addHead",
    			bindKey: {
    				win: "F1"
    			},
    			exec: this.head
    		}, {
    			name: "addCode",
    			bindKey: {
    				win: "F2"
    			},
    			exec: this.code
    		}, {
    			name: "bold",
    			bindKey: {
    				win: "F3"
    			},
    			exec: this.bold
    		}, {
    			name: "save",
    			bindKey: {
    				win: "F5"
    			},
    			exec: this.save
    		}]
    		cmd.forEach((v) => {
    			this.editor.commands.addCommand(v);
    		})
    	}

    	_indentString() {
    			return this.editor.session.getTabString();
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 *  Bold
    		 * ------------------------------------------------------------------------
    		 */
    	bold(e) {
    			let selection = e.getSelectionRange();
    			let str = e.session.getTextRange(selection);
    			if (/^\s*\*\*.+\*\*\s*$/.test(str)) {
    				str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, (match, g) => {
    					return g;
    				});

    				e.session.replace(selection, str.trim())
    				return;
    			}
    			e.session.replace(selection, ' **' + str.trim() + '** ')
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 *  Italic
    		 * ------------------------------------------------------------------------
    		 */
    	italic() {
    			let selection = this.editor.getSelectionRange();
    			let str = this.editor.session.getTextRange(selection);
    			if (/^\s*\*.+\*\s*$/.test(str)) {
    				str = str.replace(/^\s*\*(.+)\*\s*$/, (match, g) => {
    					return g;
    				});

    				this.editor.session.replace(selection, str.trim())
    				return;
    			}
    			this.editor.session.replace(selection, ' *' + str.trim() + '* ')
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 *  Code
    		 * ------------------------------------------------------------------------
    		 */
    	code(e) {
    			let selection = e.getSelectionRange();
    			let str = e.session.getTextRange(selection);

    			if (str.trim()) {
    				if (/\n/.test(str)) {
    					str = "```\n" + str.trim() + "\n```\n";
    				} else {
    					str = " `" + str.trim() + "` ";
    				}
    			} else {
    				str = "\n```\n\n```\n";
    			}
    			e.session.replace(selection, str)
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Sort lines
    		 * ------------------------------------------------------------------------
    		 */
    	sort() {

    	}

    	/**
    	 * ------------------------------------------------------------------------
    	 * Indent Decrease
    	 * ------------------------------------------------------------------------
    	 */
    	indent() {
    			let range = this.editor.getSelectionRange().collapseRows();
    			this.editor.session.outdentRows(range);
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * List bulleted
    		 * ------------------------------------------------------------------------
    		 */
    	bulleted() {
    			let range = this.editor.getSelectionRange().collapseRows();
    			let doc = this.editor.session.doc;
    			for (var row = range.start.row; row <= range.end.row; row++)
    				doc.insertInLine({
    					row: row,
    					column: 0
    				}, "* ");
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Numeric List
    		 * ------------------------------------------------------------------------
    		 */
    	numeric() {
    			let range = this.editor.getSelectionRange().collapseRows();
    			let doc = this.editor.session.doc;
    			var i = 1;
    			for (var row = range.start.row; row <= range.end.row; row++) {
    				doc.insertInLine({
    					row: row,
    					column: 0
    				}, i + ". ");
    				i++;
    			}
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Undo
    		 * ------------------------------------------------------------------------
    		 */
    	undo() {
    			this.editor.undo();
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Redo
    		 * ------------------------------------------------------------------------
    		 */
    	redo() {
    			this.editor.redo();
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Format code for json
    		 * ------------------------------------------------------------------------
    		 */
    	fmt2json() {
    			let selection = this.editor.getSelectionRange();
    			let str = this.editor.session.getTextRange(selection);

    			str = str.replace(/[\"\'\n]/g, (m, g) => {
    				if (m === '\n')
    					return '\\n';
    				return '\\' + m;
    			})

    			this.editor.session.replace(selection, str)
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Hr
    		 * ------------------------------------------------------------------------
    		 */
    	hr() {
    			let selection = this.editor.getSelectionRange();
    			let str = this.editor.session.getTextRange(selection);
    			this.editor.session.replace(selection, "\n\n---\n" + str)
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Insert Image
    		 * ------------------------------------------------------------------------
    		 */
    	insertImg() {
    			return this.dialogProxy.template('template/image-dialog.html', "dialog-insert-image");
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * Insert Link
    		 * ------------------------------------------------------------------------
    		 */
    	insertLink() {
    			let selection = this.editor.getSelectionRange();
    			let str = this.editor.session.getTextRange(selection);


    			this.editor.session.replace(selection, "[" + str.trim() + "]()")
    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * New
    		 * ------------------------------------------------------------------------
    		 */
    	new() {
    		window.note_id = null;
    		this.editor.setValue('');
    		this._.html(window.$holder.title, "Note");
    	}
    	/**
    	 * ------------------------------------------------------------------------
    	 *  Save
    	 * ------------------------------------------------------------------------
    	 */
    	save(e) {
    			let content = e.getValue();
    			let title = content.firstLine();
    			if (!title) return;
    			else {
    				title = title.replace(/^# +/, '');
    			}
    			let id = window.note_id || -1;
    			let datas = null;
    			if (id !== -1) {
    				datas = {

    					id: id,
    					title: title,
    					content: content
    				}
    			} else {
    				datas = {
    					id: id,
    					title: title,
    					content: content,
    					create: Date.now()
    				}
    			}

    			console.log("The id of the post data is: ", datas.id);
    			if (content.trim()) {
    				Ajax.to("/put-note", {
    					body: JSON.stringify(datas)
    				}).then((t) => {
    					console.log(arguments);
    					window.note_id = t;
    					_.html(window.$holder.title, title);
    				}).catch(() => {
    					console.log(arguments);
    				})
    			}

    		}
    		/**
    		 * ------------------------------------------------------------------------
    		 * 
    		 * ------------------------------------------------------------------------
    		 */
    	head(e) {
    		let range = e.getSelectionRange().collapseRows();
    		let doc = e.session.doc;
    		let line = doc.getLine(range.start.row)
    		if (/^#* /.test(line)) {
    			doc.insertInLine({
    				row: range.start.row,
    				column: 0
    			}, "#");
    		} else {
    			doc.insertInLine({
    				row: range.start.row,
    				column: 0
    			}, "# ");
    		}
    	}
    }


    /**
	 * ------------------------------------------------------------------------
	 * 
	 * ------------------------------------------------------------------------
	 */
	
	class DataDealer {
	constructor(editor,_) {
		this._=_;
		this.editor = editor;
		this.config = {
			triggerNote: '.note-item-title',
			nodeItemsHolder: '.dropdown-note .fixed',
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
		this._.beforeend(this._.qs(this.config.nodeItemsHolder), content);
		this.bindTriggerNote()
	}
	bindTriggerNote() {
		let notes =this._.qsa(this.config.triggerNote);
		if (!notes) return;

		let this_ = this;
		notes = window.$slice.call(notes, 0);
		notes.forEach((v) => {
		this_._.click(v, (ev) => {
				var id = this_._.atr(v, 'data-bind');
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
		let p = this._.qp(ev.target, 'dropdown')
		if (p) {
			this._.removeClass(p, 'is-active');
		}
	}
	content(datas) {
		this.editor.setValue(datas.content);
		console.log(window.note_id);
		window.note_id = datas._id;
		this._.html(window.$holder.title, datas.title);
	}
}



    /**
	 * ------------------------------------------------------------------------
	 * 
	 * ------------------------------------------------------------------------
	 */

class DialogProxy {
	constructor(_) {
		// Config for this class
		this.config = {
			// the className for the close button
			close: ".dialog-close",
			//the className for the cancel button
			cancel: '.dialog-cancel'
		}
		this.init();
		this._=_;
	}
	init() {
		let dialogs = document.querySelectorAll('dialog');
		dialogs = window.$slice.call(dialogs, 0);
		for (let dlg of dialogs) {

			let close = this._.qs(dlg, this.config.close)
			this_._.click(close, (ev) => {
				ev.currentTarget.parentNode.close();
			})

		}
	}
	bindClose(dlg) {
		let this_=this;
		let close = Abstract.qs(dlg, this.config.close)
		Abstract.click(close, (ev) => {
			ev.currentTarget.parentNode.close();
		})

		let cancel = Abstract.qs(dlg, this.config.cancel);
		if (cancel) {
			Abstract.click(cancel, (ev) => {
				ev.currentTarget.parentNode.parentNode.parentNode.close();
			})

		}
	}
	createDialog(className, html) {
		let dlg = document.createElement('dialog');
		dlg.className = className;
		dlg.innerHTML = html;
		return dlg;
	}
	template(url, className) {
		let this_ = this;
		var promise = new Promise((resolve, reject) => {
			Ajax.to(url, {
				method: 'GET'
			}).then((t) => {
				let dlg = this_.createDialog(className, t)
				this.bindClose(dlg)
				document.body.appendChild(dlg);
				resolve(dlg);
			}).catch(() => {
				reject()
			})
		})
		return promise;
	}
}


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





    /**
     * ------------------------------------------------------------------------
     * 
     * ------------------------------------------------------------------------
     */
    class MenuProxy {
    	constructor(ele,editor, _) {
    		this.ele = ele;
            this.editor=editor;
    		this.config = {
    			isactive: 'is-active'
    		}
    		this._ = _;
    		this._bindClose(); 
    	}
    	show(x, y) {
    		this.ele.style.top = `${y}px`;
    		this.ele.style.left = `${x}px`;
    		this._.addClass(this.ele, this.config.isactive);
    		this.ele.addEventListener('blur', this.blur.bind(this));
    	}
        execCommand(ele){
            this.editor.execCommand( this._.atr(ele,'data-binding'))
        }
    	_bindClose() {
    		let items = document.querySelectorAll('li>a');
    		items = window.$slice.call(items, 0)
    		let self=this;
    		items.forEach((v) => {
    			self._.click(v, (ev) => {
    				self._close();
                    self.execCommand(ev.target)
    			})
    		});

    		self._.click(document, () => {
    			self._close();
    		})
    	}
    	_close() {
    		this._.removeClass(this.ele, this.config.isactive);

    	}
    	blur() {
    		this._.removeClass(this.ele, 'is-active');
    	}
    }


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


