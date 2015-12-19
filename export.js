'use strict';

const sqlite3 = require('sqlite3')
const fs = require('fs');
class Manager {
	constructor(db, output) {
		//this.sql_insert = sqlInsert;
		this.open(db);
		this.output = output;
	}
	open(filename) {
		this.db = new sqlite3.Database(filename);
	}
	validFileName(f) {
		return f.replace(/[\/\"\<\>\|\:\?\*\\]/g, " ");
	}
	queryAll() {
		let this_ = this;
		this.db.all("SELECT  title,category,content FROM markdown", function(err, row) {
			row.forEach((k) => {
				//console.log(this_.validFileName(k['title']));
				let output=this_.output.concat(k.category);
				console.log(output);
				
				fs.existsSync(output)||fs.mkdirSync(output);
				fs.writeFile([output, "/",this_.validFileName(k.title),".md"].join(''), k.content);

			})
		})

	}

	close() {
		this.db.close();
	}

}

new Manager('static/database/doc.db', "test/export/").queryAll();