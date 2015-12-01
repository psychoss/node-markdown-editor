'use strict';

const resolve = require('path').resolve;
const send = require('koa-send');

function serve(root, opts) {
	opts = opts || {};

	opts.root = resolve(root);
	if (opts.index !== false) opts.index = opts.index || 'index.html';

	if (!opts.defer) {
		return function* serve(next) {
			if (this.method == 'HEAD' || this.method == 'GET') {
				if (yield send(this, this.path, opts)) return;
			}
			yield * next;
		};
	}

	return function* serve(next) {
		yield * next;
		if (this.method != 'HEAD' && this.method != 'GET') return;
		if (this.body != null || this.status != 404) return;
		yield send(this, this.path, opts);
	};
}
module.exports=serve;