'use strict';
const koa = require('koa');
const kr = require('koa-route');
const app = koa();

const server = require('./lib/server');
const config = require('./lib/config');
const database = require('./lib/database');

const db = new database(database.open(config.sqlitePath), config.sql_insert);
const routes = {
	index: function* () {
		this.body = "hello"
	}
}



//app.use(kr.get("/", routes.index));


app.use(server.staticServer(config.staticPath))
app.use(server.jsonParser());
app.listen(8083);

class Router {
	constructor(app) {
		this.app = app;
		this.init();
	}
	init() {
		this.app.use(kr.post("/put-note", function* () {
			try {
				let id = yield db.upsert(this.request.body);
				console.log("id" + id);
				this.body = id;
			} catch (err) {
				this.status = 500;
				this.body = err;
			}
		}));

		this.app.use(kr.post('/query-all', function* () {
			try {
				let rows = yield db.queryAll();
				this.body = JSON.stringify(rows);
			} catch (error) {
				this.status = 500;
				this.body = err;
			}

		}));

		this.app.use(kr.post('/query-one', function* () {
			try {
				let datas = yield db.queryOne(this.request.body.id);
				this.body=JSON.stringify(datas);
			} catch (error) {
				this.status = 500;
				this.body = err;
			}
		}))
	}
}

new Router(app);