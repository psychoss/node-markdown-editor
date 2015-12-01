'use strict';
class Abstract {
	/**
	 * ------------------------------------------------------------------------
	 *  ClassName
	 * ------------------------------------------------------------------------
	 */
	static addClass(ele, className) {
		if (ele.classList.contains(className)) return;
		ele.classList.add(className);
	}
	static removeClass(ele, className) {
		if (ele.classList.contains(className))
			ele.classList.remove(className);
	}
	static toggleClass(ele, className) {
		if (ele.classList.contains(className)) {
			ele.classList.remove(className);
		} else {
			ele.classList.add(className);
		}
	}
	static atr(ele, property, val) {
		if (val) {
			ele.setAttribute(property, val)
		} else {
			return ele.getAttribute(property)
		}
	}
	/**
	 * ------------------------------------------------------------------------
	 *  Dimensions
	 * ------------------------------------------------------------------------
	 */
	//The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
	static boundingRect(ele) {
		// return a object like:

		// ClientRect {}
		// bottom: 29
		// height: 24
		// left: 520
		// right: 546
		// top: 5
		// width: 26
		return ele.getBoundingClientRect();
	}
	/**
	 * ------------------------------------------------------------------------
	 * Event
	 * ------------------------------------------------------------------------
	 */
	/*Event.target
		A reference to the object that dispatched the event. It is different from event.currentTarget 
	when the event handler is called during the bubbling or capturing phase of the event.
	*/
	// Carefully dont add multi times.
	static click(ele, callback) {
		ele.addEventListener('click', callback);
	}

	/**
	 * ------------------------------------------------------------------------
	 *  Find
	 * ------------------------------------------------------------------------
	 */
	static qs(ele, selector) {
		if (selector) {
			return ele.querySelector(selector)
		} else {
			return document.querySelector(ele)
		}
	}
	static parent(ele) {
		return ele.parentNdoe;
	}
	/**
	 * ------------------------------------------------------------------------
	 * Content
	 * ------------------------------------------------------------------------
	 */
	
	static html(ele,value){
		if (value) {
			ele.innerHTML=value;
		} else {
			return ele.innerHTML;
		}
	}
	/*
	'beforebegin'
Before the element itself.
'afterbegin'
Just inside the element, before its first child.
'beforeend'
Just inside the element, after its last child.
'afterend'
After the element itself.
	*/
	static afterend(ele, h) {
		ele.insertAdjacentHTML('afterend', h);
	}
	static beforeend(ele, h) {
		ele.insertAdjacentHTML('beforeend', h);
	}
}