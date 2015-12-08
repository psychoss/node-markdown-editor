 var editor = (function() {
 	/**
 	 * ------------------------------------------------------------------------
 	 *  setting and initialize the editor
 	 * ------------------------------------------------------------------------
 	 */
 	ace.require('ace/ext/language_tools')
 	var e = ace.edit(document.querySelector('.editor'))
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
 		status(1);
 		e.configs.markdown.innerHTML = marked(e.getValue().trim());
 	})

 	/**
 	 * ------------------------------------------------------------------------
 	 * Status
 	 * ------------------------------------------------------------------------
 	 */

 	function status(changed) {

 		if (changed && !commandSave.classList.contains('careful')) {
 			commandSave.classList.add('careful');
 		} else if (!changed && commandSave.classList.contains('careful')) {
 			commandSave.classList.contains('careful') && commandSave.classList.remove('careful');
 		}

 	}

 	/**
 	 * ------------------------------------------------------------------------
 	 * fetch the note from the server by the id
 	 * ------------------------------------------------------------------------
 	 */
 	function getContent(id) {
 		$ajax.fetch("/query-one", {
 			data: JSON.stringify({
 				id: id
 			})
 		}).then(function(v) {
 			// a hack for parse the json string to object
 			var data = new Function('return ' + v)();
 			e.setValue(data.content);
 			document.body.setAttribute('data-binding', data._id);
 			document.querySelector('title').innerHTML = data.title;
 		}, function() {
 			$log.e(arguments);
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
 			save: function() {
 				var content = e.getValue().trim();
 				var title = content.firstLine();
 				if (!title) {
 					Notifier.show("Shoud not to save the empty.", {
 						style: 'alert-danger'
 					});
 					return;
 				} else {
 					title = title.replace(/^# +/, '');
 				}
 				$log.d("the title to database=>", title);


 				var id = document.body.getAttribute('data-binding') || -1;
 				$log.d("the id to database =>", id);
 				var datas = null;
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
 				$log.d("the datas to database=>", datas);

 				$ajax.fetch("/put-note", {
 					data: JSON.stringify(datas)
 				}).then(function(v) {
 					status(0);
 					console.log("the di return by server is " + v);
 					if (+v !== 0) {
 						console.log("changed the body data-binding");
 						document.body.setAttribute('data-binding', v)
 					}
 					Notifier.show("Success.", {
 						style: 'alert-success'
 					});
 					if (document.querySelector('title').innerHTML !== title) {
 						document.querySelector('title').innerHTML = title;
 						ajax.fetch("/query-all").then(function(v) {
 							SlideLayout.refresh(v);
 						}, function() {}, function() {});
 					}
 				}, function() {

 					Notifier.show("Failed to save the data", {
 						style: 'alert-danger'
 					});
 				})

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
 				$log.d(str);
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
 				console.log(str);
 				for (var l = 0; l < str.length; l++) {
 					line = str[l]
 					console.log(line);
 					if (l % 2 === 0) {
 						c += "- **" + line + "**\n\n"
 					} else {
 						c += " " + line + "\n\n"
 					}
 				}

 				replaceSelectedText(c);
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
 		name: "save",
 		bindKey: {
 			win: "F5"
 		},
 		exec: commands.save
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
 	function bindCommands() {
 		var btn = document.querySelectorAll(".command");
 		var l = btn.length;
 		while (l--) {
 			btn[l].addEventListener('click', function(ev) {
 				e.execCommand(ev.currentTarget.getAttribute('data-binding'))
 			})
 		}

 	}
 	bindCommands();
 	e.getContent = getContent;
 	return e;
 }());