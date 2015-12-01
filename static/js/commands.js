'use strict';
class Commands {
	constructor(editor, dialogProxy) {
		this.editor = editor;
		this.dialogProxy = dialogProxy;
	}
	_indentString() {
			return this.editor.session.getTabString();
		}
		/**
		 * ------------------------------------------------------------------------
		 *  Bold
		 * ------------------------------------------------------------------------
		 */
	bold() {
			let selection = this.editor.getSelectionRange();
			let str = this.editor.session.getTextRange(selection);
			if (/^\s*\*\*.+\*\*\s*$/.test(str)) {
				str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, (match, g) => {
					return g;
				});

				this.editor.session.replace(selection, str.trim())
				return;
			}
			this.editor.session.replace(selection, ' **' + str.trim() + '** ')
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
	code() {
			let selection = this.editor.getSelectionRange();
			let str = this.editor.session.getTextRange(selection);

			if (str.trim()) {
				if (/\n/.test(str)) {
					str = "```\n" + str.trim() + "\n```\n";
				} else {
					str = " `" + str.trim() + "` ";
				}
			} else {
				str = "\n```\n\n```\n";
			}
			this.editor.session.replace(selection, str)
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
		 * Insert Image
		 * ------------------------------------------------------------------------
		 */
	insertImg() {
			return this.dialogProxy.template('template/image-dialog.html', "dialog-insert-image");
		}
		/**
		 * ------------------------------------------------------------------------
		 * New
		 * ------------------------------------------------------------------------
		 */
	new() {
		window.note_id = null;
		this.editor.setValue('');
		Abstract.html(window.$holder.title, "Note");
	}
	/**
	 * ------------------------------------------------------------------------
	 *  Save
	 * ------------------------------------------------------------------------
	 */
	save() {
		let content = this.editor.getValue();
		let title = content.firstLine();
		if (!title) return;
		else {
			title = title.replace(/^# +/, '');
		}
		let id = window.note_id || -1;

		if (content.trim()) {
			 Ajax.to("/put-note", {
				body: JSON.stringify({
					id: id,
					title: title,
					content: content,
					create: Date.now()
				})}).then((t) => {
				console.log(arguments);
				window.note_id = t;
				Abstract.html(window.$holder.title, title);
			}).catch(() => {
				console.log(arguments);
			})
		}

	}
}