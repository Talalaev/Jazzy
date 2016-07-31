var Jazzy =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Jazzy = function Jazzy(el, actions, state, flux) {
	    _classCallCheck(this, Jazzy);

	    var self = this,
	        deferredAction = {
	        afterDelay: {},
	        afterEnd: {}
	    },
	        animated = {},
	        states = {};

	    this.findDuration = findDuration;
	    this.findDelay = findDelay;

	    if (state) {
	        setTimeout(function () {
	            self[state]();
	            states[state] = true;
	        }, 0);
	    }

	    actions.forEach(function (action) {

	        states[action.name] = state === states[action.name] ? true : false;

	        self[action.name] = function () {
	            for (var key in states) {
	                if (key === action.name) continue;
	                states[key] = false;
	            }
	            if (!action.allowRestart) {
	                if (states[action.name]) {
	                    return;
	                } else {
	                    states[action.name] = !states[action.name];
	                }
	            }

	            console.time("animationShow");
	            //console.time("event animationEnd");

	            if (action.cancelActions && action.cancelActions.length) {
	                // отмена текущих действий и запланированных
	                action.cancelActions.forEach(function (cancelAction) {
	                    clearTimeout(deferredAction.afterEnd[cancelAction.name]);
	                    clearTimeout(deferredAction.afterDelay[cancelAction.name]);
	                    cancelAction.removeClass.forEach(function (className) {
	                        Jazzy.removeClass(el, className);
	                    });
	                    animated[cancelAction.name] = false;
	                });
	            }

	            // нельзя планировать следующую анимацию пока не выполнилась текущая
	            if (animated[action.name]) return console.log("animated");
	            animated[action.name] = true;

	            // действие до анимации
	            action.rightNow(el);

	            // генерация событий старта
	            if (action.events) {
	                if (action.events.rightNow && action.events.rightNow.forEach) {
	                    action.events.rightNow.forEach(function (event) {
	                        flux.emit(event);
	                    });
	                }
	            }

	            deferredAction.afterDelay[action.name] = setTimeout(function () {
	                console.timeEnd("delayShow");
	                console.timeEnd("delayHide");

	                var delay = findDelay(el),
	                    duration = findDuration(el);

	                //  действия после задержки
	                action.afterDelay(el, action.delay, duration);

	                // генерация событий после задержки
	                if (action.events) {
	                    if (action.events.afterDelay && action.events.afterDelay.forEach) {
	                        action.events.afterDelay.forEach(function (event) {
	                            flux.emit(event);
	                        });
	                    }
	                }
	                /*
	                    // если просто раскоментировать то срабатывание события будет нестабильным. рас сработало, рас нет
	                    // позже могут все не сработавшие события прилететь на следущем сработавшем.
	                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	                    $(el).one(animationEnd, function() {
	                        alert("TYT");
	                        console.log("animationEnd");
	                    });
	                */

	                // действия после анимации
	                deferredAction.afterEnd[action.name] = setTimeout(function () {
	                    animated[action.name] = false;
	                    delete deferredAction.afterEnd[action.name];
	                    action.afterAnimation(el, action.delay, duration);

	                    // генерация событий окончания
	                    if (action.events) {
	                        if (action.events.afterAnimation && action.events.afterAnimation.forEach) {
	                            action.events.afterAnimation.forEach(function (event) {
	                                flux.emit(event);
	                            });
	                        }
	                    }
	                }, findDuration(el));
	            }, action.delay);
	        };
	    });

	    function findDuration(el) {
	        var duration = getComputedStyle(el).animationDuration;
	        duration = duration.slice(-2, -1) === "m" ? duration.slice(0, -2) : duration.slice(0, -1) * 1000;
	        return duration;
	    }
	    function findDelay(el) {
	        var delay = getComputedStyle(el).animationDelay;
	        delay = delay.slice(-2, -1) === "m" ? delay.slice(0, -2) : delay.slice(0, -1) * 1000;
	        return delay;
	    }
	};

	var helpers = __webpack_require__(2);

	Jazzy.addClass = helpers.addClass;
	Jazzy.removeClass = helpers.removeClass;
	Jazzy.createAnimation = __webpack_require__(3);
	Jazzy.createSwitchShowing = __webpack_require__(4);

	module.exports = Jazzy;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.addClass = function addClass(el, className) {
	    if (~el.className.search(new RegExp("\\b" + className + "\\b"))) return;
	    el.className += ' ' + className;
	};

	exports.removeClass = function removeClass(el, className) {
	    el.className = el.className.replace(className, "").replace(/ +$/, "");
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function createAnimation(options) {
	    options.animationName = options.animationName || options.name;
	    options.state = options.state !== false ? options.name : false;
	    return new Jazzy(options.el, [{
	        name: options.name,
	        rightNow: function rightNow(el) {
	            Jazzy.addClass(el, options.animationName);
	        },
	        afterDelay: function afterDelay(el) {},
	        afterAnimation: function afterAnimation(el) {
	            Jazzy.removeClass(el, options.animationName);
	            console.timeEnd("animationShow");
	        },
	        allowRestart: options.restart,
	        delay: 0,
	        events: options.flux ? {
	            rightNow: ["start"],
	            afterDelay: ["afterDelay"],
	            afterAnimation: ["end"]
	        } : undefined
	    }], options.state, options.flux);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function createSwitchShowing(options) {
	    return new Jazzy(options.el, [{
	        name: "show",
	        rightNow: function rightNow(el) {
	            Jazzy.addClass(el, options.animationName.show);
	            Jazzy.addClass(el, "hide");
	        },
	        afterDelay: function afterDelay(el) {
	            Jazzy.removeClass(el, "hide");
	        },
	        afterAnimation: function afterAnimation(el) {
	            Jazzy.removeClass(el, options.animationName.show);
	            console.timeEnd("animationShow");
	        },
	        cancelActions: [{
	            name: "hide",
	            removeClass: [options.animationName.hide]
	        }],
	        delay: 0,
	        events: options.flux ? {
	            rightNow: ["show:start"],
	            afterDelay: ["show:afterDelay"],
	            afterAnimation: ["show:end"]
	        } : undefined
	    }, {
	        name: "hide",
	        rightNow: function rightNow(el) {},
	        afterDelay: function afterDelay(el) {
	            Jazzy.addClass(el, options.animationName.hide);
	        },
	        afterAnimation: function afterAnimation(el) {
	            Jazzy.addClass(el, "hide");
	            Jazzy.removeClass(el, options.animationName.hide);
	            console.timeEnd("animationHide");
	        },
	        cancelActions: [{
	            name: "show",
	            removeClass: [options.animationName.show]
	        }],
	        delay: 0,
	        events: options.flux ? {
	            rightNow: ["hide:start"],
	            afterDelay: ["hide:afterDelay"],
	            afterAnimation: ["hide:end"]
	        } : undefined
	    }], options.state, options.flux);
	};

/***/ }
/******/ ]);