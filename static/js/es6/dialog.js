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