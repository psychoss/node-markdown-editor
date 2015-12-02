'use strict';
class Commands {
	constructor(editor, dialogProxy) {
		this.editor = editor;
		this.dialogProxy = dialogProxy;
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
		Abstract.html(window.$holder.title, "Note");
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
		console.log(id);
		let datas = null;
		if (id!==-1) {
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
		if (content.trim()) {
			Ajax.to("/put-note", {
				body: JSON.stringify(datas)
			}).then((t) => {
				console.log(arguments);
				window.note_id = t;
				Abstract.html(window.$holder.title, title);
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