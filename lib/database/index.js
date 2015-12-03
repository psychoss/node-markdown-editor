'use strict';

const sqlite3 = require('sqlite3').verbose();

class Manager {
	constructor(db, sqlInsert) {
		this.db = db;
		//this.sql_insert = sqlInsert;
	}
	static open(filename) {
		return new sqlite3.Database(filename);
	}
	static table(db, sql) {
			return db.run(sql)
		}
		/**
		 * ------------------------------------------------------------------------
		 * 
		 * ------------------------------------------------------------------------
		 */
	upsert(data, callback) {
			var promise = new Promise((resolve, reject) => {
				let id = data.id;
				console.log(id);
				if (id === -1) {
					id = null;
				}
				let title = data.title || null;
				let cat = data.category || null;
				let content = data.content || null;
				data.create = data.create || null;
				data.modified = Date.now();
				var datas = null;
				let sql = null;
				if (id===null) {
					sql = "INSERT OR REPLACE  INTO markdown VALUES (?, ?, ?, ?, ?, ?)";
					datas = [id, title, cat, content, data.create, data.modified];
				} else {
					sql = "UPDATE  markdown SET title=?, category=?,content=?, modified=? WHERE _id = ?"
					datas = [title, cat, content, data.modified, id];
				}

				let s = this.db.run(sql, datas, function(error) {
					//console.log("id=%s",id);
					if (!error) {
						let id = this.lastID;
						resolve(id)
					} else {
						console.log(error);
						reject(error.code);
					}
				});
			})
			return promise;
		}
		/**
		 * ------------------------------------------------------------------------
		 * Query notes
		 * ------------------------------------------------------------------------
		 */
	queryAll() {
			var promise = new Promise((resolve, reject) => {
				this.db.all("SELECT _id, title, category, modified FROM markdown  ORDER BY modified DESC LIMIT 0, 500", function(err, row) {
					if (err) {
						reject(err)
					} else {
						resolve(row)
					}
				})

			})
			return promise;
		}
		/**
		 * ------------------------------------------------------------------------
		 * 
		 * ------------------------------------------------------------------------
		 */
	close() {
			this.db.close();
		}
		/**
		 * ------------------------------------------------------------------------
		 * 
		 * ------------------------------------------------------------------------
		 */
	queryOne(id) {
		var promise = new Promise((resolve, reject) => {
			this.db.get("SELECT _id, title, category,content FROM markdown  WHERE _id = ?", [id], function(err, row) {
				if (err) {
					reject(err)
				} else {
					resolve(row)
				}
			})

		})
		return promise;
	}
}

module.exports = Manager;