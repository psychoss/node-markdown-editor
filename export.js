'use strict';

const sqlite3 = require('sqlite3')
const fs=require('fs');
class Manager {
	constructor(db) {
		//this.sql_insert = sqlInsert;
		this.open(db);
	}
	 open(filename) {
	this.db= new sqlite3.Database(filename);
	}
   validFileName(f){
	   return f.replace( /[\/\"\'\?\|\:]+/g," ");
   }
	queryAll() {
		let this_=this;
		this.db.all("SELECT  title,content FROM markdown", function(err, row) {
		  row.forEach((k)=>{
			//console.log(this_.validFileName(k['title']));

			fs.writeFile("test/"+this_.validFileName(k['title'])+".md",k['content']);
		  
		  })
		})

	}

	close() {
		this.db.close();
	}

}

new Manager('static/database/doc.db').queryAll();