    /**
     *  Global Variables
     * ------------------------------------------------------------------------
     *  $template
     * 
     * ------------------------------------------------------------------------
     */
    ;
    (function() {
    	function DropDown(parameters) {
    		this.trigger = parameters.trigger;
    		this.template = parameters.template;
    		this.width = parameters.width;
			this.datas=parameters.datas||null;
    		this.loadedCallback = parameters.loaded;
    		this.loadImmediate = parameters.loadImmediate;
    		this.init();
    	}
    	/**
    	 * ------------------------------------------------------------------------
    	 *  be carefully, the instances of this class will share the 'CONST' 
    	 * ------------------------------------------------------------------------
    	 */
    	DropDown.prototype.CONST = {
    		dropdown: '.dropdown',
    		holder: 'dropdown-holder',
    		style: [{
    			"position": 'absolute',
    			"box-sizing": 'border-box',
    			"z-index": "21",
    		}],
    		gutter: 2,
    		item: '.dropdown__menu-item',
    		itemHover: 'dropdown__menu-item--hover'
    	}

    	DropDown.prototype.init = function() {
    		var container = document.createDocumentFragment();
    		this.showing = false;
    		this.holder = document.createElement('div');

    		container.appendChild(this.holder)
    		document.body.appendChild(container);
    		this.bindEvent();
    		if (this.loadImmediate) {
    			this.show();


    		}
    	}
    	DropDown.prototype.bindEvent = function() {

    		if (this.trigger) {
    			var this_ = this;
    			this.trigger.addEventListener('click', function(ev) {
    				ev.stopImmediatePropagation();
    				if (this_.showing) {
    					this_.hide();
    				} else {
    					this_.show();

    				}
    			});
    		}
    	}
    	DropDown.prototype.calculatePosition = function() {
    		if (this.trigger) {
    			var rts = this.trigger.getBoundingClientRect();
    			var ot = rts.top + rts.height + this.CONST.gutter;
    			this.holder.style.top = ot + 'px';
    			var rth = this.holder.querySelector(this.CONST.dropdown).getBoundingClientRect();
    			this.holder.style.left = (rts.left - rth.width + rts.width) + 'px'
    			if (this.loadImmediate) {
    				this.holder.style.display = 'none';
    				this.showing = false;

    			}
    		}

    	}
    	DropDown.prototype.flatProperties = function(arr) {
    		var r = "";
    		var l = arr.length;
    		for (; l--;) {
    			for (var key in arr[l]) {
    				r += key + ":" + arr[l][key] + ";"
    			}
    		}

    		return r;
    	}
    	DropDown.prototype.applyStyle = function() {
    		this.holder.setAttribute('style', this.flatProperties(this.CONST.style));

    		if (this.width) {
    			var dropdown = this.holder.querySelector(this.CONST.dropdown);
    			if (dropdown) {
    				dropdown.style.width = this.width + 'px';
    			}
    		}

    	}
    	DropDown.prototype.show = function() {

    		if (this.loaded) {
    			this.holder.style.display = 'block';
    			this.showing = true;

    		} else {
    			this.fillTemplate();
    		}

    	}
    	DropDown.prototype.loadFromURL = function() {
    		var ok = this.refreshContent.bind(this);
    		$ajax.html(this.template).then(ok, function() {
    			console.log(arguments);
    		});
    	}
    	DropDown.prototype.hover = function() {
    		if (this.holder) {
    			var hoverClass = 'dropdown__menu-item--hover';

    			this.holder.addEventListener('mouseenter', function(ev) {
    				var target = ev.target || ev.srcElement;

    				if (target.classList.contains())
    					if (target.classList.contains(hoverClass))
    						target.classList.add(hoverClass)
    			});

    			this.holder.addEventListener('mouseleave', function(ev) {
    				var target = ev.target || ev.srcElement;

    				if (target.classList.contains())
    					if (target.classList.contains(hoverClass))
    						target.classList.add(hoverClass)
    			});
    		}
    	}
    	DropDown.prototype.refreshContent = function(text) {
    		var self = this;

    		var hover = function() {
    			var items = self.holder.querySelectorAll(self.CONST.item);
    			var i = items.length;
    			for (; i--;) {
    				items[i].addEventListener('mouseenter', function(ev) {
    					if (!ev.target.classList.contains(self.CONST.itemHover))
    						ev.target.classList.add(self.CONST.itemHover)
    				});
    				items[i].addEventListener('mouseleave', function(ev) {
    					if (ev.target.classList.contains(self.CONST.itemHover))
    						ev.target.classList.remove(self.CONST.itemHover)
    				});
    			}
    		};

    		self.loaded = true;
            
            
			// if datas of this is not null
    		if (this.datas) {
    			self.holder.innerHTML = '<div class="dropdown">'+$template.multiLine(text, this.datas)+"</div>";
    			this.datas = null;
    		} else {
    			self.holder.innerHTML = text;
    		}

    		hover();
    		document.addEventListener('click', function() {
    			self.hide();
    		});
    		self.showing = true;
    		self.applyStyle();
    		self.calculatePosition();
    		if (self.loadedCallback) {
    			self.loadedCallback(self.holder);
    		}

    	}
    	DropDown.prototype.fillTemplate = function() {
    		if ($validator.path(this.template)) {
    			this.loadFromURL();
    		} else {
    			this.refreshContent(this.template)
    		}
    	}
    	DropDown.prototype.hide = function() {
    		if (this.loaded) {
    			this.holder.style.display = 'none';
    			this.showing = false;
    		}
    	}
    	window.DropDown = DropDown;
    }());