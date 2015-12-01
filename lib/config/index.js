const config = {
	staticPath: "./static",
	sqlitePath:'./static/database/doc.db',
	sql_table:"CREATE TABLE `markdown` (	`_id`	INTEGER,	`title`	TEXT,	`category`	TEXT,	`content`	TEXT,	`create`	INTEGER,	`modified`	INTEGER,	PRIMARY KEY(_id));",
	sql_insert:"INSERT OR REPLACE  INTO markdown VALUES (?, ?, ?, ?, ?, ?)"
}

module.exports=config;