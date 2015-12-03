    /**
     * ------------------------------------------------------------------------
     * 
     * ------------------------------------------------------------------------
     */
    class MenuProxy {
    	constructor(ele,editor, _) {
    		this.ele = ele;
            this.editor=editor;
    		this.config = {
    			isactive: 'is-active'
    		}
    		this._ = _;
    		this._bindClose(); 
    	}
    	show(x, y) {
    		this.ele.style.top = `${y}px`;
    		this.ele.style.left = `${x}px`;
    		this._.addClass(this.ele, this.config.isactive);
    		this.ele.addEventListener('blur', this.blur.bind(this));
    	}
        execCommand(ele){
            this.editor.execCommand( this._.atr(ele,'data-binding'))
        }
    	_bindClose() {
    		let items = document.querySelectorAll('li>a');
    		items = window.$slice.call(items, 0)
    		let self=this;
    		items.forEach((v) => {
    			self._.click(v, (ev) => {
    				self._close();
                    self.execCommand(ev.target)
    			})
    		});

    		self._.click(document, () => {
    			self._close();
    		})
    	}
    	_close() {
    		this._.removeClass(this.ele, this.config.isactive);

    	}
    	blur() {
    		this._.removeClass(this.ele, 'is-active');
    	}
    }