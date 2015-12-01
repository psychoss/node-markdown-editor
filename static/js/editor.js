'use strict';


class MarkdownProxy {
	constructor(editor) {
		this.config = {
			className: '.markdown-body'
		}
		this.editor = editor;
		this.init();
	}

	init() {
		this.markdownBody = Abstract.qs(this.config.className);
		this.config.should = true;
	}
	set should(value) {
		this.config.should = value;
	}
	whenChange() {
		if (this.config.should) {
			let m = markdown.toHTML(editor.getValue().trim(), 'Maruku');
			Abstract.html(this.markdownBody, m);
		}
	}
}

ace.require('ace/ext/language_tools')
var editor = ace.edit('editor');
editor.$blockScrolling = Infinity;
editor.setShowPrintMargin(false);
editor.getSession().setMode('ace/mode/markdown');
editor.setAutoScrollEditorIntoView(true);
editor.setOption("wrap", true);
let markdownProxy = new MarkdownProxy(editor);

editor.on('change', markdownProxy.whenChange.bind(markdownProxy));