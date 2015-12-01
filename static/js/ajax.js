'use strict';

class Ajax {
	constructor() {


	}
	static defaults() {
			//An options object containing any custom settings that you want to apply to the request. The possible options are:
			// method: The request method, e.g., GET, POST.
			// headers: Any headers you want to add to your request, contained within a Headers object or ByteString.
			// body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
			// mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
			// credentials: The request credentials you want to use for the request: omit, same-origin, or include.
			// cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.

			let h = new Headers();
			h.append('Content-Type', 'application/json');

			return {
				method: "POST",
				headers: h
			}
		}
		/**
		 * ------------------------------------------------------------------------
		 * 
		 * ------------------------------------------------------------------------
		 */
	static to(url, opt) {
		 var promise = new Promise((resolve, reject) => {
			let data = {}
			data = window.extend(data,Ajax.defaults(), opt);
			var r = new Request(url);
			
			// return function*(){
			// 	yield fetch(r, data).then((rsp)=>{
			// 		console.log(rsp);
			// 		return rsp.text();
			// 	},()=>{
				
			// 	})
			// }
			
			fetch(r, data).then((rsp) => {
				rsp.text().then((t) => {
					resolve(t)
				}, () => {
					reject(arguments);
				})
			}, () => {
				reject(arguments);
			})
		})
		return promise;

	}
}