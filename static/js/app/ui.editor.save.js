;
(function() {

	function SaveCommand(_editor) {
		this.title = $('title');
		this.editor = _editor;
		this.init();
	}

	SaveCommand.prototype.init = function() {
		if (this.editor) {
			this.editor.commands.addCommand({
				name: "save",
				bindKey: {
					win: "F5"
				},
				exec: this.hook.bind(this)
			})
		}
	}


	SaveCommand.prototype.notifyWarn = function(message) {
		Notifier.show(message, {
			style: 'alert-danger'
		});
	}

	SaveCommand.prototype.collectData = function() {
		var content = this.editor.getValue();
		if (!/\w/.test(content)) {
			this.notifyWarn("Shoud not to save the empty.");
			return void 1;
		}
		var title = content.firstLine().replace(/^# +/, ''),
			id = document.body.getAttribute('data-binding') || -1,
			category = 'Notes',
			datas = {},
			cat = document.querySelector('.category.is-selected');
		if (cat) {
			category = cat.textContent.trim() || category;
		}

		if (id !== -1) {
			datas = {
				id: id,
				title: title,
				content: content,
				category: category
			}
		} else {
			datas = {
				id: id,
				title: title,
				content: content,
				category: category,
				create: Date.now()

			}
		}
		return datas;
	}
	SaveCommand.prototype.push = function(datas) {
		var body = "";
		try {
			body = JSON.stringify(datas)
		} catch (error) {
			this.notifyWarn(error);
			return;
		}

		var success = function(id) {
			if (+id !== 0) {
				document.body.setAttribute('data-binding', id);
			}

			commandSave.classList.contains('careful') && commandSave.classList.remove('careful');
			 $slideLayout.refreshByCategory(datas.category);

			if (this.title.html() !== datas.title) {
				this.title.html(datas.title);
			}
			Notifier.show("Success.", {
				style: 'alert-success'
			});
		}.bind(this);

		$ajax.fetch("/put-note", {
			data: body
		}).then(success, this.notifyWarn)
	}

	SaveCommand.prototype.hook = function() {
		console.log('fired save command');
		var datas = this.collectData();
		if (datas === undefined) return;
		this.push(datas);
		console.log("The datas will be save is ", datas);

	}
	new SaveCommand(editor);

}());