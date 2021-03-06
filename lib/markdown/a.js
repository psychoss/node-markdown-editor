'use strict';
const fs = require('fs');
const co = require('co');
const thunkify = require('thunkify');
const readdir = thunkify(fs.readdir);
const path = require('path');

 



class MarkdownMarker {
	constructor(dir) {
		this.dir = dir;
		this.content = `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
	<meta http-equiv="Content-Language" content="zh">
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
	<title></title>
	<style>
		
html {
			font-family: sans-serif;
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%
		}
		
		body {
			margin: 0
		}
		
		article,
		aside,
		details,
		figcaption,
		figure,
		footer,
		header,
		hgroup,
		main,
		menu,
		nav,
		section,
		summary {
			display: block
		}
		
		audio,
		canvas,
		progress,
		video {
			display: inline-block;
			vertical-align: baseline
		}
		
		audio:not([controls]) {
			display: none;
			height: 0
		}
		
		[hidden],
		template {
			display: none
		}
		
		a {
			background-color: transparent
		}
		
		a:active,
		a:hover {
			outline: 0
		}
		
		abbr[title] {
			border-bottom: 1px dotted
		}
		
		b,
		strong {
			font-weight: 700
		}
		
		dfn {
			font-style: italic
		}
		
		h1 {
			font-size: 2em;
			margin: .67em 0
		}
		
		mark {
			background: #ff0;
			color: #000
		}
		
		small {
			font-size: 80%
		}
		
		sub,
		sup {
			font-size: 75%;
			line-height: 0;
			position: relative;
			vertical-align: baseline
		}
		
		sup {
			top: -.5em
		}
		
		sub {
			bottom: -.25em
		}
		
		img {
			border: 0
		}
		
		svg:not(:root) {
			overflow: hidden
		}
		
		figure {
			margin: 1em 40px
		}
		
		hr {
			box-sizing: content-box;
			height: 0
		}
		
		pre {
			overflow: auto
		}
		
		code,
		kbd,
		pre,
		samp {
			font-family: monospace, monospace;
			font-size: 1em
		}
		
		button,
		input,
		optgroup,
		select,
		textarea {
			color: inherit;
			font: inherit;
			margin: 0
		}
		
		button {
			overflow: visible
		}
		
		button,
		select {
			text-transform: none
		}
		
		button,
		html input[type="button"],
		input[type="reset"],
		input[type="submit"] {
			-webkit-appearance: button;
			cursor: pointer
		}
		
		button[disabled],
		html input[disabled] {
			cursor: default
		}
		
		button::-moz-focus-inner,
		input::-moz-focus-inner {
			border: 0;
			padding: 0
		}
		
		input {
			line-height: normal
		}
		
		input[type="checkbox"],
		input[type="radio"] {
			box-sizing: border-box;
			padding: 0
		}
		
		input[type="number"]::-webkit-inner-spin-button,
		input[type="number"]::-webkit-outer-spin-button {
			height: auto
		}
		
		input[type="search"] {
			-webkit-appearance: textfield;
			box-sizing: content-box
		}
		
		input[type="search"]::-webkit-search-cancel-button,
		input[type="search"]::-webkit-search-decoration {
			-webkit-appearance: none
		}
		
		fieldset {
			border: 1px solid silver;
			margin: 0 2px;
			padding: .35em .625em .75em
		}
		
		legend {
			border: 0;
			padding: 0
		}
		
		textarea {
			overflow: auto
		}
		
		optgroup {
			font-weight: 700
		}
		
		table {
			border-collapse: collapse;
			border-spacing: 0
		}
		
		td,
		th {
			padding: 0
		}
.markdown-body {
	box-sizing: border-box;
	flex-grow: 1;
	font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: 16px;
	line-height: 1.6;
	word-wrap: break-word;
	padding: 8px;
}

.markdown-body:before {
	display: table;
	content: ""
}

.markdown-body:after {
	display: table;
	clear: both;
	content: ""
}

.markdown-body>*:first-child {
	margin-top: 0 !important
}

.markdown-body>*:last-child {
	margin-bottom: 0 !important
}

.markdown-body a:not([href]) {
	color: inherit;
	text-decoration: none
}

.markdown-body .absent {
	color: #c00
}

.markdown-body .anchor {
	display: inline-block;
	padding-right: 2px;
	margin-left: -18px
}

.markdown-body .anchor:focus {
	outline: none
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
	margin-top: 1em;
	margin-bottom: 16px;
	font-weight: bold;
	line-height: 1.4
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
	color: #000;
	vertical-align: middle;
	visibility: hidden
}

.markdown-body h1:hover .anchor,
.markdown-body h2:hover .anchor,
.markdown-body h3:hover .anchor,
.markdown-body h4:hover .anchor,
.markdown-body h5:hover .anchor,
.markdown-body h6:hover .anchor {
	text-decoration: none
}

.markdown-body h1:hover .anchor .octicon-link,
.markdown-body h2:hover .anchor .octicon-link,
.markdown-body h3:hover .anchor .octicon-link,
.markdown-body h4:hover .anchor .octicon-link,
.markdown-body h5:hover .anchor .octicon-link,
.markdown-body h6:hover .anchor .octicon-link {
	visibility: visible
}

.markdown-body h1 tt,
.markdown-body h1 code,
.markdown-body h2 tt,
.markdown-body h2 code,
.markdown-body h3 tt,
.markdown-body h3 code,
.markdown-body h4 tt,
.markdown-body h4 code,
.markdown-body h5 tt,
.markdown-body h5 code,
.markdown-body h6 tt,
.markdown-body h6 code {
	font-size: inherit
}

.markdown-body h1 {
	padding-bottom: 0.3em;
	font-size: 2.25em;
	line-height: 1.2;
	border-bottom: 1px solid #eee
}

.markdown-body h1 .anchor {
	line-height: 1
}

.markdown-body h2 {
	padding-bottom: 0.3em;
	font-size: 1.75em;
	line-height: 1.225;
	border-bottom: 1px solid #eee
}

.markdown-body h2 .anchor {
	line-height: 1
}

.markdown-body h3 {
	font-size: 1.5em;
	line-height: 1.43
}

.markdown-body h3 .anchor {
	line-height: 1.2
}

.markdown-body h4 {
	font-size: 1.25em
}

.markdown-body h4 .anchor {
	line-height: 1.2
}

.markdown-body h5 {
	font-size: 1em
}

.markdown-body h5 .anchor {
	line-height: 1.1
}

.markdown-body h6 {
	font-size: 1em;
	color: #777
}

.markdown-body h6 .anchor {
	line-height: 1.1
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,

{
	margin-top: 0;
	margin-bottom: 16px
}

.markdown-body hr {
	height: 4px;
	padding: 0;
	margin: 16px 0;
	background-color: #e7e7e7;
	border: 0 none
}

.markdown-body ul,
.markdown-body ol {
	padding-left: 2em
}

.markdown-body ul.no-list,
.markdown-body ol.no-list {
	padding: 0;
	list-style-type: none
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
	margin-top: 0;
	margin-bottom: 0
}

.markdown-body li>p {
	margin-top: 16px
}

.markdown-body dl {
	padding: 0
}

.markdown-body dl dt {
	padding: 0;
	margin-top: 16px;
	font-size: 1em;
	font-style: italic;
	font-weight: bold
}

.markdown-body dl dd {
	padding: 0 16px;
	margin-bottom: 16px
}

.markdown-body blockquote {
	padding: 0 15px;
	color: #777;
	border-left: 4px solid #ddd
}

.markdown-body blockquote>:first-child {
	margin-top: 0
}

.markdown-body blockquote>:last-child {
	margin-bottom: 0
}

.markdown-body table {
	display: block;
	width: 100%;
	overflow: auto;
	word-break: normal;
	word-break: keep-all
}

.markdown-body table th {
	font-weight: bold
}

.markdown-body table th,
.markdown-body table td {
	padding: 6px 13px;
	border: 1px solid #ddd
}

.markdown-body table tr {
	background-color: #fff;
	border-top: 1px solid #ccc
}

.markdown-body table tr:nth-child(2n) {
	background-color: #f8f8f8
}

.markdown-body img {
	max-width: 100%;
	box-sizing: content-box;
	background-color: #fff
}

.markdown-body img[align=right] {
	padding-left: 20px
}

.markdown-body img[align=left] {
	padding-right: 20px
}

.markdown-body .emoji {
	max-width: none
}

.markdown-body span.frame {
	display: block;
	overflow: hidden
}

.markdown-body span.frame>span {
	display: block;
	float: left;
	width: auto;
	padding: 7px;
	margin: 13px 0 0;
	overflow: hidden;
	border: 1px solid #ddd
}

.markdown-body span.frame span img {
	display: block;
	float: left
}

.markdown-body span.frame span span {
	display: block;
	padding: 5px 0 0;
	clear: both;
	color: #333
}

.markdown-body span.align-center {
	display: block;
	overflow: hidden;
	clear: both
}

.markdown-body span.align-center>span {
	display: block;
	margin: 13px auto 0;
	overflow: hidden;
	text-align: center
}

.markdown-body span.align-center span img {
	margin: 0 auto;
	text-align: center
}

.markdown-body span.align-right {
	display: block;
	overflow: hidden;
	clear: both
}

.markdown-body span.align-right>span {
	display: block;
	margin: 13px 0 0;
	overflow: hidden;
	text-align: right
}

.markdown-body span.align-right span img {
	margin: 0;
	text-align: right
}

.markdown-body span.float-left {
	display: block;
	float: left;
	margin-right: 13px;
	overflow: hidden
}

.markdown-body span.float-left span {
	margin: 13px 0 0
}

.markdown-body span.float-right {
	display: block;
	float: right;
	margin-left: 13px;
	overflow: hidden
}

.markdown-body span.float-right>span {
	display: block;
	margin: 13px auto 0;
	overflow: hidden;
	text-align: right
}

.markdown-body kbd {
	display: inline-block;
	padding: 3px 5px;
	font-size: 11px;
	line-height: 10px;
	color: #555;
	vertical-align: middle;
	background-color: #fcfcfc;
	border: solid 1px #ccc;
	border-bottom-color: #bbb;
	border-radius: 3px;
	box-shadow: inset 0 -1px 0 #bbb
}

code {
	padding: 2px 4px;
	font-size: 90%;
	color: #c7254e;
	background-color: #f9f2f4;
	border-radius: 4px;
}


	.markdown-body  ol {
		list-style: decimal;
	}
	.markdown-body  ul {
		list-style: disc;
	}
	.markdown-body  strong {
		font-weight: 700;
	}
	.markdown-body pre {
		display: block;
		margin: 0 0 10px;
		font-size: 13px;
		line-height: 1.42857143;
		color: #333;
		border-radius: 2px;
		margin-top: 0;
		margin-bottom: 0;
		word-break: normal;
		white-space: nowrap;
		border: 0;
		padding: 9px 14px;
		margin-bottom: 14px;
		background-color: #f7f7f9;
		border: 1px solid #e1e1e8;
		border-radius: 4px;
	}

	.markdown-body pre code {
		padding: 0;
		font-size: inherit;
		white-space: pre;
		white-space: pre-wrap;
		word-wrap: break-word;
		background-color: transparent;
		border-radius: 0;
		color: #333;
	}

 

.alert {
	padding: 15px;
	margin-bottom: 20px;
	border: 1px solid transparent;
	border-radius: 4px
}

.alert h4 {
	margin-top: 0;
	color: inherit
}

.alert .alert-link {
	font-weight: 700
}

.alert>p,
.alert>ul {
	margin-bottom: 0
}

.alert>p+p {
	margin-top: 5px
}

.alert-dismissable {
	padding-right: 35px
}

.alert-dismissable .close {
	position: relative;
	top: -2px;
	right: -21px;
	color: inherit
}

.alert-success {
	background-color: #dff0d8;
	border-color: #d6e9c6;
	color: #3c763d
}

.alert-success hr {
	border-top-color: #c9e2b3
}

.alert-success .alert-link {
	color: #2b542c
}

.alert-info {
	background-color: #d9edf7;
	border-color: #bce8f1;
	color: #31708f
}

.alert-info hr {
	border-top-color: #a6e1ec
}

.alert-info .alert-link {
	color: #245269
}

.alert-warning {
	background-color: #fcf8e3;
	border-color: #faebcc;
	color: #8a6d3b
}

.alert-warning hr {
	border-top-color: #f7e1b5
}

.alert-warning .alert-link {
	color: #66512c
}

.alert-danger {
	background-color: #f2dede;
	border-color: #ebccd1;
	color: #a94442
}

.alert-danger hr {
	border-top-color: #e4b9c0
}

.alert-danger .alert-link {
	color: #843534
}

.comment {
	color: #969896;
}
		
	</style>
</head>

<body>
	<div class="markdown-body"><pre><code>{{我}}</code></pre></div>
</body>

</html>`
	}
	isDir(f) {
		var promise = new Promise((resolve, reject) => {
			fs.stat(f, function(err, s) {
				if (err) {
					reject(err)
				} else {
					resolve({
						p: f,
						dir: s.isDirectory()
					})
				}
			})
		})
		return promise;
	}
	getfiles() {
		this._getFiles(this.dir);
	}
	changeFileExt(f, e) {
		let pos = f.lastIndexOf('.');
		if (~pos) {
			return f.substr(0, pos) + e
		} else {
			return f;
		}
	}

	md2html(file) {
		let this_ = this;
		var promise = new Promise((resolve, reject) => {
			fs.readFile(file, (err, data) => {
				if (err) {
					reject(err)
				} else {
					let p = this_.changeFileExt(file, ".html");
					let ext = path.extname(file);
					if (/scss|js|rs|go/.test(ext)) {
 
						console.log('tu');
						let content = data.toString().replace(/&/g,"&amp;").replace(/'/g,'&#39;').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(^|[^\\])\/\*[\w\W]*?\*\//g, function(m) {
			return '<span class="comment">' + m + '</span>';
		}).replace(/(^|[^\\:])\/\/.*/g, function(m) {
			return '<span class="comment">' + m + '</span>';
		});
						 
						fs.writeFile(p, this_.content.replace(/{{我}}/, content))
					}
					// } else if (ext === '.md') {
					// 	fs.writeFile(p, this_.content.replace(/{{我}}/, marked(data.toString())))

					// }
					resolve()
				}

			})
		})
		return promise;
	}
	_getFiles(dir) {
		let this_ = this;

		co(function*() {
			var files = yield readdir(dir)
			var stats = yield files.map((file) => {
				let v = this_.isDir(path.join(dir, file));
				return Promise.resolve(v)
			})
			let results = yield stats.map((s) => {
					if (s.dir) {
						this_._getFiles(s.p)
					} else {
						if (/(?:css|js|go|md|scss|rs)$/g.test(s.p))
							console.log(Promise.resolve(this_.md2html(s.p)));
					}
				})
				// var stats = files.map((f) => {
				// 	let s = stat(path.join(dir, f));
				// 	if (s.isDirectory()) {
				// 		//	this_._getFiles(path.join(dir, f))
				// 	} else if (s.isFile()) {
				// 		console.log(f)
				// 	}
				// 	return f;
				// })

		})
	}

}
///home/psycho/RESOURCE/归档/temporary/markdown
// /home/psycho/RESOURCE/归档/web/test/export
// /home/psycho/Downloads/ACHIEVE/markdown
let m = new MarkdownMarker('/home/psycho/Downloads/ACHIEVE/markdown/Source Code/RUST');

m.getfiles()