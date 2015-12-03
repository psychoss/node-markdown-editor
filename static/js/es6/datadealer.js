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
