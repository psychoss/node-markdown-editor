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
				if (id === -1 || id === "-1") {
					id = null;
				}
				let title = data.title || null;
				let cat = data.category || null;
				console.log(data);
				let content = data.content || null;
				data.create = data.create || Date.now();
				data.modified = Date.now();
				var datas = null;
				let sql = null;

				if (id === null) {

					sql = "INSERT OR REPLACE  INTO markdown VALUES (?, ?, ?, ?, ?, ?)";
					datas = [id, title, cat, content, data.create, data.modified];
				} else {

					sql = "UPDATE  markdown SET title=?, category=?,content=?, modified=? WHERE _id = ?"
					datas = [title, cat, content, data.modified, id];
				}

				let s = this.db.run(sql, datas, function(error) {

					if (!error) {
						if (this.sql.slice(0, 1) === "U") {
							resolve(0);
							return;
						}
						let id = this.lastID;
						resolve(id)
					} else {

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
		var promise = new Promise((resolve, reject) => { // LIMIT 0, 500
			this.db.all("SELECT _id, title, category, modified FROM markdown  ORDER BY modified DESC", function(err, row) {
				if (err) {
					reject(err)
				} else {
					resolve(row)
				}
			})

		})
		return promise;
	}

	queryAllByCategory(cat) {
			var promise = new Promise((resolve, reject) => {
				this.db.all("SELECT _id, title, category, modified FROM markdown WHERE category = '" + cat + "' ORDER BY modified DESC", function(err, row) {
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
		console.log("query one note by id => ", id);
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

	/**
	 * ------------------------------------------------------------------------
	 * Search
	 * ------------------------------------------------------------------------
	 */

	search(sr) {
		var promise = new Promise((resolve, reject) => {
			this.db.all("SELECT * FROM notes WHERE notes MATCH '" + sr + "'", function(err, row) {
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