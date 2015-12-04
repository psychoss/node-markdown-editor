 var editor = (function() {
 	var e = ace.edit(document.querySelector('.editor'))
 	e.$blockScrolling = Infinity;
 	e.setShowPrintMargin(false);
 	e.getSession().setMode('ace/mode/markdown');
 	e.setAutoScrollEditorIntoView(true);
 	e.setOption("wrap", true);
 	e.configs = {
 		markdown: null
 	}
 	e.configs.markdown = document.querySelector('.markdown-body');
 	e.on('change', function() {
 		e.configs.markdown.innerHTML = marked(e.getValue().trim());
 	})

 	function getContent(id) {
 		ajax.fetch("/query-one", {
 			data: JSON.stringify({
 				id: id
 			})
 		}).then(function(v) {
 			var data = JSON.parse(v);
 			e.setValue(data.content);
 			window.NOTE_ID = data._id;
 			console.log(window.NOTE_ID);

 		}, function() {
 			console.log(arguments);
 		}, function() {
 			console.log(arguments);
 		});
 	}

 	function selectedText() {
 		return e.session.getTextRange(e.getSelectionRange())
 	}

 	function replaceSelectedText(str) {
 		e.session.replace(e.getSelectionRange(), str);
 	}
 	var commands = {
 		new: function() {
 			if (e.configs.ask) {
 				return;
 			}
 			e.setValue("");
 			window.NOTE_ID = -1;
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

 			var id = window.NOTE_ID || -1;
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

 			ajax.fetch("/put-note", {
 				data: JSON.stringify(datas)
 			}).then(function(v) {
 				window.NOTE_ID = v;
 				$log.d("return by the server=>", arguments);
 				Notifier.show("Success.", {
 					style: 'alert-success'
 				});
 				document.querySelector('title').innerHTML = title;
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
 		}
 	}

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
 	}, ]

 	var l = cmd.length;
 	while (l--) {
 		e.commands.addCommand(cmd[l])
 	}

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