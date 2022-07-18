(function(t){if(!t.BX){t.BX={}}var e=t.BX;e.Promise=function(t,e){this.state=null;this.value=null;this.reason=null;this.next=null;this.ctx=e||this;this.onFulfilled=[];this.onRejected=[]};e.Promise.prototype.fulfill=function(t){this.checkState();this.value=t;this.state=true;this.execute()};e.Promise.prototype.reject=function(t){this.checkState();this.reason=t;this.state=false;this.execute()};e.Promise.prototype.then=function(t,i){if(typeof t=="function"||t instanceof Function){this.onFulfilled.push(t)}if(typeof i=="function"||i instanceof Function){this.onRejected.push(i)}if(this.next===null){this.next=new e.Promise(null,this.ctx)}if(this.state!==null){this.execute()}return this.next};e.Promise.prototype.catch=function(t){if(typeof t=="function"||t instanceof Function){this.onRejected.push(t)}if(this.next===null){this.next=new e.Promise(null,this.ctx)}if(this.state!==null){this.execute()}return this.next};e.Promise.prototype.setAutoResolve=function(t,e){this.timer=setTimeout(function(){if(this.state===null){this[t?"fulfill":"reject"]()}}.bind(this),e||15)};e.Promise.prototype.cancelAutoResolve=function(){clearTimeout(this.timer)};e.Promise.prototype.resolve=function(t){var e=this;if(this===t){this.reject(new TypeError("Promise cannot fulfill or reject itself"))}else if(t&&t.toString()==="[object BX.Promise]"){t.then(function(t){e.fulfill(t)},function(t){e.reject(t)})}else{this.fulfill(t)}};e.Promise.prototype.toString=function(){return"[object BX.Promise]"};e.Promise.prototype.execute=function(){if(this.state===null){return}var i=undefined;var n=undefined;var o=undefined;var s;if(this.state===true){if(this.onFulfilled.length){try{for(s=0;s<this.onFulfilled.length;s++){o=this.onFulfilled[s].apply(this.ctx,[this.value]);if(typeof o!="undefined"){i=o}}}catch(i){if("console"in t){console.dir(i)}if(typeof e.debug!=="undefined"){e.debug(i)}n=i}}else{i=this.value}}else if(this.state===false){if(this.onRejected.length){try{for(s=0;s<this.onRejected.length;s++){o=this.onRejected[s].apply(this.ctx,[this.reason]);if(typeof o!="undefined"){i=o}}}catch(i){if("console"in t){console.dir(i)}if(typeof e.debug!=="undefined"){e.debug(i)}n=i}}else{n=this.reason}}if(this.next!==null){if(typeof n!="undefined"){this.next.reject(n)}else if(typeof i!="undefined"){this.next.resolve(i)}}};e.Promise.prototype.checkState=function(){if(this.state!==null){throw new Error("You can not do fulfill() or reject() multiple times")}}})(window);
//# sourceMappingURL=core_promise.map.js