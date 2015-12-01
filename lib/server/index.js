'use strict';

const body = require('./parse-json');
const staticServer= require('./static');


module.exports={
		jsonParser:body,
		staticServer:staticServer
	
}
