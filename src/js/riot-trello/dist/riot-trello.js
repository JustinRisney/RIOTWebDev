var RiotTrello = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function isPromise(value) {
		return value && typeof value.then === 'function';
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function handlePromise(promise, info) {
		var token = info.token = {};

		function update(type, index, key, value) {
			if (info.token !== token) return;

			info.resolved = key && { [key]: value };

			const child_ctx = assign(assign({}, info.ctx), info.resolved);
			const block = type && (info.current = type)(info.component, child_ctx);

			if (info.block) {
				if (info.blocks) {
					info.blocks.forEach((block, i) => {
						if (i !== index && block) {
							block.o(() => {
								block.d(1);
								info.blocks[i] = null;
							});
						}
					});
				} else {
					info.block.d(1);
				}

				block.c();
				block[block.i ? 'i' : 'm'](info.mount(), info.anchor);

				info.component.root.set({}); // flush any handlers that were created
			}

			info.block = block;
			if (info.blocks) info.blocks[index] = block;
		}

		if (isPromise(promise)) {
			promise.then(value => {
				update(info.then, 1, info.value, value);
			}, error => {
				update(info.catch, 2, info.error, error);
			});

			// if we previously had a then/catch block, destroy it
			if (info.current !== info.pending) {
				update(info.pending, 0);
				return true;
			}
		} else {
			if (info.current !== info.then) {
				update(info.then, 1, info.value, promise);
				return true;
			}

			info.resolved = { [info.value]: promise };
		}
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto = {
		destroy,
		get,
		fire,
		on,
		set,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src\board.html generated by Svelte v2.13.5 */

	function promise({src}) {
		return fetch('https://trello.com/b/VqeyyqrX.json')
		.then((res) => {
			return res.json().then((obj) => {
				console.log(obj);
				let output = {
					lists: [],
					list_ids: {},
					name: obj.name
				};
				
				for(let i = 0; i != obj.lists.length; i++){
					let list = obj.lists[i];
					if(!list.closed){
						let index = output.lists.push(list) - 1;
						output.list_ids[list.id] = list;
						output.lists[index].cards = [];
					}
				}
				
				for(let i = 0; i != obj.cards.length; i++){
					let card = obj.cards[i];
					if(!card.closed){
						let list = output.list_ids[card.idList];
						if(list){
							list.cards.push(card);
						}
					}
				}
				
				console.log(output);
				
				return output;
			}).catch((err) => {
				throw err;
			});
		});
	}

	function create_main_fragment(component, ctx) {
		var div, promise_1;

		let info = {
			component,
			ctx,
			current: null,
			pending: create_pending_block,
			then: create_then_block,
			catch: create_catch_block,
			value: 'data',
			error: 'err'
		};

		handlePromise(promise_1 = ctx.promise, info);

		return {
			c() {
				div = createElement("div");

				info.block.c();

				this.c = noop;
				div.className = "board";
			},

			m(target, anchor) {
				insert(target, div, anchor);

				info.block.m(div, info.anchor = null);
				info.mount = () => div;
			},

			p(changed, _ctx) {
				ctx = _ctx;
				info.ctx = ctx;

				if (('promise' in changed) && promise_1 !== (promise_1 = ctx.promise) && handlePromise(promise_1, info)) ; else {
					info.block.p(changed, assign(assign({}, ctx), info.resolved));
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				info.block.d();
				info = null;
			}
		};
	}

	// (19:17)    <p>LOADING...</p>   {:then data}
	function create_pending_block(component, ctx) {
		var p;

		return {
			c() {
				p = createElement("p");
				p.textContent = "LOADING...";
			},

			m(target, anchor) {
				insert(target, p, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(p);
				}
			}
		};
	}

	// (23:1) {#each data.lists as list}
	function create_each_block(component, ctx) {
		var div, text_value = ctx.list.name, text, text_1, each_anchor;

		var each_value_1 = ctx.list.cards;

		var each_blocks = [];

		for (var i = 0; i < each_value_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(component, get_each_context_1(ctx, each_value_1, i));
		}

		var each_else = null;

		if (!each_value_1.length) {
			each_else = create_each_block_1_else(component, ctx);
			each_else.c();
		}

		return {
			c() {
				div = createElement("div");
				text = createText(text_value);
				text_1 = createText("\r\n\t\t");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
				div.className = "list";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, text);
				insert(target, text_1, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insert(target, each_anchor, anchor);

				if (each_else) {
					each_else.m(target, null);
				}
			},

			p(changed, ctx) {
				if ((changed.promise) && text_value !== (text_value = ctx.list.name)) {
					setData(text, text_value);
				}

				if (changed.promise) {
					each_value_1 = ctx.list.cards;

					for (var i = 0; i < each_value_1.length; i += 1) {
						const child_ctx = get_each_context_1(ctx, each_value_1, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block_1(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value_1.length;
				}

				if (each_value_1.length) {
					if (each_else) {
						each_else.d(1);
						each_else = null;
					}
				} else if (!each_else) {
					each_else = create_each_block_1_else(component, ctx);
					each_else.c();
					each_else.m(each_anchor.parentNode, each_anchor);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
					detachNode(text_1);
				}

				destroyEach(each_blocks, detach);

				if (detach) {
					detachNode(each_anchor);
				}

				if (each_else) each_else.d(detach);
			}
		};
	}

	// (25:2) {#each list.cards as card}
	function create_each_block_1(component, ctx) {
		var div, text_value = ctx.card.name, text;

		return {
			c() {
				div = createElement("div");
				text = createText(text_value);
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, text);
			},

			p(changed, ctx) {
				if ((changed.promise) && text_value !== (text_value = ctx.card.name)) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (27:2) {:else}
	function create_each_block_1_else(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.textContent = "ERROR";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (21:1) {:then data}
	function create_then_block(component, ctx) {
		var h1, text_value = ctx.data.name, text, text_1, each_anchor;

		var each_value = ctx.data.lists;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		return {
			c() {
				h1 = createElement("h1");
				text = createText(text_value);
				text_1 = createText("\r\n\t");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m(target, anchor) {
				insert(target, h1, anchor);
				append(h1, text);
				insert(target, text_1, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insert(target, each_anchor, anchor);
			},

			p(changed, ctx) {
				if ((changed.promise) && text_value !== (text_value = ctx.data.name)) {
					setData(text, text_value);
				}

				if (changed.promise) {
					each_value = ctx.data.lists;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(h1);
					detachNode(text_1);
				}

				destroyEach(each_blocks, detach);

				if (detach) {
					detachNode(each_anchor);
				}
			}
		};
	}

	// (31:1) {:catch err}
	function create_catch_block(component, ctx) {
		var p, text_value = ctx.err, text;

		return {
			c() {
				p = createElement("p");
				text = createText(text_value);
			},

			m(target, anchor) {
				insert(target, p, anchor);
				append(p, text);
			},

			p(changed, ctx) {
				if ((changed.promise) && text_value !== (text_value = ctx.err)) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(p);
				}
			}
		};
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.list = list[i];
		child_ctx.each_value = list;
		child_ctx.list_index = i;
		return child_ctx;
	}

	function get_each_context_1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.card = list[i];
		child_ctx.each_value_1 = list;
		child_ctx.card_index = i;
		return child_ctx;
	}

	class Board extends HTMLElement {
		constructor(options = {}) {
			super();
			init(this, options);
			this._state = assign({}, options.data);
			this._recompute({ src: 1 }, this._state);
			this._intro = true;

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `<style>h1{color:red}.board{background-color:orange;border-radius:10px;color:red}.list{background-color:red;border-radius:10px;color:orange}</style>`;

			this._fragment = create_main_fragment(this, this._state);

			this._fragment.c();
			this._fragment.m(this.shadowRoot, null);

			if (options.target) this._mount(options.target, options.anchor);
		}

		static get observedAttributes() {
			return ["src"];
		}

		get src() {
			return this.get().src;
		}

		set src(value) {
			this.set({ src: value });
		}

		attributeChangedCallback(attr, oldValue, newValue) {
			this.set({ [attr]: newValue });
		}
	}

	assign(Board.prototype, proto);
	assign(Board.prototype, {
		_mount(target, anchor) {
			target.insertBefore(this, anchor);
		}
	});

	customElements.define("riot-trello", Board);

	Board.prototype._recompute = function _recompute(changed, state) {
		if (changed.src) {
			if (this._differs(state.promise, (state.promise = promise(state)))) changed.promise = true;
		}
	};

	return Board;

}());