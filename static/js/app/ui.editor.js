var editor = (function() {
	/**
	 * ------------------------------------------------------------------------
	 *  setting and initialize the editor
	 * ------------------------------------------------------------------------
	 */
	ace.require('ace/ext/language_tools')
	var e = ace.edit(document.querySelector('.editor'));


	marked.setOptions({
		highlight: function(code) {

			//return Prism.highlight (code);
			return code.replace(/[<>]/g, function(m) {
				if (m === '<')
					return '&lt;'
				else if (m === '>')
					return '&gt;'
			}).replace( /(^|[^\\])\/\*[\w\W]*?\*\//g,function(m){
				return '<span class="comment">' + m + '</span>';
			}).replace(/(^|[^\\:])\/\/.*/g, function(m) {
				return '<span class="comment">' + m + '</span>';
			})
		}
	});


	e.category = [];

	e.$blockScrolling = Infinity;
	e.setShowPrintMargin(false);
	e.getSession().setMode('ace/mode/markdown');
	e.setAutoScrollEditorIntoView(true);
	e.setOption("wrap", true);
	e.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: false
	});

	e.configs = {
			markdown: null
		}
		/**
		 * -----------------------------------------------------------------------
		 *  For live render the markdown
		 * ------------------------------------------------------------------------
		 */
	e.configs.markdown = document.querySelector('.markdown-body');
	e.on('change', function() {
		if (!commandSave.classList.contains('careful')) {
			commandSave.classList.add('careful');
		}
		e.configs.markdown.innerHTML = marked(e.getValue().trim());
	})



	/**
	 * ------------------------------------------------------------------------
	 * fetch the note from the server by the id
	 * ------------------------------------------------------------------------
	 */
	function getContent(id) {


		$ajax.fetch("/query-one", {
			method: 'POST',
			data: JSON.stringify({
				id: id
			})
		}).then(function(v) {


			// a hack for parse the json string to object
			var data = new Function('return ' + v)();
			if (data.category) {

				var sel = document.querySelector('.category.is-selected');
				if (sel) {
					sel.classList.remove('is-selected')
				}

				if (!e.category.length)
					e.category = document.querySelectorAll('.dropdown__menu-item.category');
				var i = e.category.length;

				for (; i--;) {
					if (e.category[i].innerText.trim() === data.category) {
						e.category[i].classList.add('is-selected');
					}
				}
			}
			e.setValue(data.content);
			document.body.setAttribute('data-binding', data._id);
			document.querySelector('title').innerHTML = data.title;

		}, function() {

		});
	}

	/**
	 * ------------------------------------------------------------------------
	 *   Helper for get and replace the selected text in the editor
	 * ------------------------------------------------------------------------
	 */
	function selectedText() {
		return e.session.getTextRange(e.getSelectionRange())
	}

	function replaceSelectedText(str) {
		e.session.replace(e.getSelectionRange(), str);
	}

	/**
	 * ------------------------------------------------------------------------
	 *  Actually implement the command's logic
	 * ------------------------------------------------------------------------
	 */
	var commands = {
			new: function() {
				if (e.configs.ask) {
					return;
				}
				e.setValue("");
				document.body.setAttribute('data-binding', -1)
				document.querySelector('title').innerHTML = "New Note";
			},

			head: function() {
				var range = e.getSelectionRange().collapseRows();
				var doc = e.session.doc;
				var line = doc.getLine(range.start.row)
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
			},
			bold: function() {
				var str = selectedText();
				if (/^\s*\*\*.+\*\*\s*$/.test(str)) {
					str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, function(match, g) {
						return g;
					});
				} else {
					str = " **" + str.trim() + "** "
				}
				replaceSelectedText(str);
			},
			italic: function() {
				var str = selectedText();
				if (/^\s*\*.+\*\s*$/.test(str)) {
					str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, function(match, g) {
						return g;
					});
				} else {
					str = " *" + str.trim() + "* "
				}
				replaceSelectedText(str);
			},
			code: function() {
				var str = selectedText();
				if (str.trim()) {
					if (/\n/.test(str)) {
						str = "```\n" + str.trim() + "\n```\n";
					} else {
						str = " `" + str.trim() + "` ";
					}
				} else {
					str = "\n```\n\n```\n";
				}
				replaceSelectedText(str);
			},
			fmtToarray: function() {
				var str = selectedText();
				str = str.replace(/[\"\']/g, function(m) {
					return "\\" + m;
				})
				str = "[\"" + str.split('\n').join("\",\n\"") + "\"]";

				replaceSelectedText(str);
			},
			preview: function() {
				var viewer = document.querySelector('.editor-preview');
				if (viewer.classList.contains('full-width')) {
					document.querySelector('.editor').style.display = 'block';
					viewer.classList.remove('full-width')
				} else {
					document.querySelector('.editor').style.display = 'none';
					viewer.classList.add('full-width');
				}
			},
			insertLink: function() {
				var str = selectedText();
				str = "[_]()".fmt(str.trim())
				replaceSelectedText(str);
			},
			bulleted: function() {
				var range = e.getSelectionRange().collapseRows();
				var doc = e.session.doc;
				for (var row = range.start.row; row <= range.end.row; row++)
					doc.insertInLine({
						row: row,
						column: 0
					}, "* ");
			},
			numeric: function() {
				var range = e.getSelectionRange().collapseRows();
				var doc = e.session.doc;
				var i = 1;
				for (var row = range.start.row; row <= range.end.row; row++) {
					doc.insertInLine({
						row: row,
						column: 0
					}, i + ". ");
					i++;
				}
			},
			removeEmpty: function() {
				var str = selectedText().split('\n');
				str = str.filter(function(v) {
					return v.trim()
				})

				replaceSelectedText(str.join('\n'));
			},
			blockquote: function() {
				var str = selectedText().split('\n');
				replaceSelectedText(">" + str.join('\n>\n>'));
			},
			customList: function() {
				var str = selectedText().trim().split('\n');
				var c = "";
				var line = "";

				for (var l = 0; l < str.length; l++) {
					line = str[l]

					if (l % 2 === 0) {
						c += "- **" + line + "**\n\n"
					} else {
						c += " " + line + "\n\n"
					}
				}

				replaceSelectedText(c);
			},
			shortDate: function() {
				var date = new Date
				var ds = date.toJSON().split(/[a-z]/i)[0]
				var str = selectedText()
				replaceSelectedText(str + ds);
			},
			addImage: function() {
				var date = new Date
				var ds = date.toJSON().split(/[a-z]/i)[0]
				var str = selectedText()
				replaceSelectedText(str + "![](/images/" + ds + "/) ");
			},
			hr: function() {
				var str = selectedText()
				replaceSelectedText(str + '\n---\n');
			}

		}
		/**
		 * ------------------------------------------------------------------------
		 *  'cmd' is a array for hold the command objects
		 * ------------------------------------------------------------------------
		 */
	var cmd = [{
		name: "new",
		exec: commands.new
	}, {
		name: "head",
		bindKey: {
			win: "F1"
		},
		exec: commands.head
	}, {
		name: "bold",
		bindKey: {
			win: "F3"
		},
		exec: commands.bold
	}, {
		name: "insertLink",
		bindKey: {
			win: "F4"
		},
		exec: commands.insertLink
	}, {
		name: "italic",
		exec: commands.italic
	}, {
		name: "code",
		bindKey: {
			win: "F2"
		},
		exec: commands.code
	}, {
		name: "preview",
		bindKey: {
			win: "F11"
		},
		exec: commands.preview
	}, {
		name: "fmtToarray",
		exec: commands.fmtToarray
	}, {
		name: 'bulleted',
		exec: commands.bulleted
	}, {
		name: 'numeric',
		exec: commands.numeric
	}, {
		name: 'removeEmpty',
		exec: commands.removeEmpty
	}, {
		name: 'blockquote',
		exec: commands.blockquote
	}, {
		name: 'customList',
		exec: commands.customList
	}, {
		name: 'shortDate',
		exec: commands.shortDate
	}, {
		name: 'hr',
		exec: commands.hr
	}, {
		name: 'addImage',
		exec: commands.addImage
	}]

	/**
	 * ------------------------------------------------------------------------
	 * loop the 'cmd' and push the commands to the editor object
	 * ------------------------------------------------------------------------
	 */
	var l = cmd.length;
	for (; l--;) {
		e.commands.addCommand(cmd[l])
	}
	/**
	 * ------------------------------------------------------------------------
	 *  find the dom which has the '.comand' classname
	 *  and register the click event with a hanlder which mapping to the commands by
	 *  the 'data-binding' attribute
	 * ------------------------------------------------------------------------
	 */
	function bindCommands(btn) {

		var l = btn.length;
		while (l--) {
			btn[l].addEventListener('click', function(ev) {
				e.execCommand(ev.currentTarget.getAttribute('data-binding'))
			})
		}

	}
	bindCommands(document.querySelectorAll(".command"));
	e.bindCommands = bindCommands;
	e.getContent = getContent;
	return e;
}());