
'use strict';
    /**
	 * ------------------------------------------------------------------------
	 * 
	 * ------------------------------------------------------------------------
	 */

const sqlite3 = require('sqlite3').verbose();

const sql_table="CREATE TABLE `markdown` (	`_id`	INTEGER,	`title`	TEXT,	`category`	TEXT,	`content`	TEXT,	`create`	INTEGER,	`modified`	INTEGER,	PRIMARY KEY(_id));";
const sqlitePath='./static/database/doc.db';
const db=new sqlite3.Database(sqlitePath);
db.run(sql_table);
db.close();