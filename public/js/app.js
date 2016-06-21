(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function() {
            return (root.NoJQuery = factory());
        });
    } else {
        // Global Variables
        root.NoJQuery = factory();
    }
}(this, function() {
    'use strict';

    function parseHTML(html) {
        var template,
            content,
            nodes;

        function supportsTemplate() {
            return 'content' in document.createElement('template');
        }

        if (supportsTemplate()) {
            template = document.createElement('template');
            content = template.content;
            template.innerHTML = html;
            nodes = content.cloneNode(true);
        } else {
            var docfrag = document.createDocumentFragment();

            template = document.createElement('nojquery');
            template.innerHTML = html;

            for (var i = 0; i < template.childNodes.length; i++) {
                docfrag.appendChild(template.childNodes[i]);
                i--;
            }

            content = docfrag;
            nodes = content.cloneNode(true);
        }

        return nodes;
    }

    function isString(obj) {
        var result = (typeof obj === 'string');
        return result;
    };

    function NoJQuery() {

        return function(selector) {
            this.elmts = [];
            this.length = 0;
            this.currentSelector = '';
            this.previousElmt;

            if (isString(selector)) {
                this.find(selector);
            } else {
                if (selector.parentNode.classList.length) {
                    this.currentSelector += ' .' + selector.parentNode.classList[0];
                }

                if (selector.classList.length) {
                    this.currentSelector += ' ' + selector.classList[0];
                }
                this.elmts.push(selector);
            }
            this.length = this.elmts.length;


            var clone = {};
            clone.elmts = this.elmts;
            clone.length = this.length;
            clone.currentSelector = this.currentSelector;
            clone.previousElmt = this.previousElmt;
            clone['__proto__'] = NoJQuery.prototype;

            return clone;
        }.bind(this);
    };

    NoJQuery.prototype.find = function(selector) {
        var total = 0,
            nodes = [],
            i = 0;

        try {
            this.currentSelector += ' ' + selector;
            nodes = document.querySelectorAll(this.currentSelector);
            total = nodes.length;
            if (total) {
                this.previousElmt = this.elmts.slice();
                this.elmts = [];
                this.length = total;
            } else {
                this.previousElmt = [];
                this.length = 0;
            }

            for (i; i < total; i++) {
                this.elmts[i] = nodes[i];
            }
        } catch (err) {
            throw new Error('find:: ' + err.message);
        }

        return this;
    };
    NoJQuery.prototype.each = function(callback) {
        Array.prototype.forEach.call(this.elmts, function(el, i) {
            el['index'] = i;
            callback(el, i);
        });
    };
    NoJQuery.prototype.addClass = function(className) {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                if (this.elmts[i].classList && this.elmts[i].classList.contains) {
                    this.elmts[i].classList.add(className);
                } else {
                    this.elmts[i].className += ' ' + className;
                }
            }
        } catch (err) {
            throw new Error('addClass:: ' + err.message);
        }

        return this;
    };
    NoJQuery.prototype.hasClass = function(className) {
        var result = false,
            total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                if (this.elmts[i].classList && this.elmts[i].classList.contains) {
                    result = this.elmts[i].classList.contains(className);
                } else {
                    result = new RegExp('(^| )' + className + '( |$)', 'gi').test(this.elmts[i].className);
                }
            }
        } catch (err) {
            throw new Error('hasClass:: ' + err.message);
        }

        return result;
    };
    NoJQuery.prototype.removeClass = function(className) {
        var total = 0,
            i = 0;
        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                if (this.elmts[i].classList && this.elmts[i].classList.remove) {
                    this.elmts[i].classList.remove(className);
                } else {
                    this.elmts[i].className = this.elmts[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }

        } catch (err) {
            throw new Error('removeClass:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.contains = function(selector) {
        var result = {},
            total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                result = this.elmts[i].querySelector(selector);
                if (result) {
                    this.length = 1;
                    break;
                }
            }
        } catch (err) {
            throw new Error('contains:: ' + err.message);
        }
        return result;
    };
    NoJQuery.prototype.empty = function() {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                this.elmts[i].innerHTML = '';
            }
        } catch (err) {
            throw new Error('empty:: ' + err.message);
        }

        return this;
    };
    NoJQuery.prototype.text = function(string) {
        var total = 0,
            i = 0,
            result = '';

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                if (string && (string.length > 0)) {
                    this.elmts[i].textContent = string;
                } else {
                    result += this.elmts[i].textContent;
                }

            }
        } catch (err) {
            throw new Error('text:: ' + err.message);
        }

        if (!string) {
            return result;
        }

        return this;
    };
    NoJQuery.prototype.html = function(string) {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                this.elmts[i].innerHTML = string;
            }
        } catch (err) {
            throw new Error('html:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.getAttr = function(attr) {
        var total = 0,
            i = 0,
            result = '';

        try {
            total = 1;
            for (i; i < total; i++) {
                result = this.elmts[i].getAttribute(attr);
            }
        } catch (err) {
            throw new Error('getAttr:: ' + err.message);
        }
        return result;
    };
    NoJQuery.prototype.setAttr = function(attr, val) {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                this.elmts[i].setAttribute(attr, val);
            }
        } catch (err) {
            throw new Error('setAttr:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.remove = function(elmt) {
        var total = 0,
            i = 0,
            elmt = {},
            removed = [];

        try {
            total = this.length;
            for (i; i < total; i++) {
                elmt = this.elmts[i];
                elmt.parentNode.removeChild(elmt);
                removed[i] = elmt;
            }
        } catch (err) {
            throw new Error('remove:: ' + err.message);
        }

        this.previousElmt = [];
        this.length = 0;

        return removed;
    };
    NoJQuery.prototype.removeAttr = function(attr) {
        var total = 0,
            i = 0,
            elmt = {};

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                elmt = this.elmts[i];
                elmt.removeAttribute(attr);
            }
        } catch (err) {
            throw new Error('removeAttr:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.prev = function(elmt) {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                this.elmts[i] = this.elmts[i].previousElementSibling;
            }
        } catch (err) {
            throw new Error('prev:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.next = function() {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {
                this.elmts[i] = this.elmts[i].nextElementSibling;
            }
        } catch (err) {
            throw new Error('next:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.append = function(el) {
        var total = 0,
            i = 0,
            node,
            textNode;

        try {
            total = this.elmts.length;
            textNode = isString(el);

            if (textNode === false) {
                node = el.elmts[0];
            }
            if (textNode) {
                node = parseHTML(el);
            }

            if (total === 0) {
                this.elmts[this.elmts.length - 1].appendChild(node);
            }

            for (i; i < total; i++) {
                this.elmts[i].appendChild(node);
            }
        } catch (err) {
            throw new Error('append:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.prepend = function(el) {
        var total = 0,
            i = 0,
            node,
            textNode,
            parent;

        try {
            total = this.previousElmt.length;
            textNode = isString(el);

            if (textNode === false) {
                node = el.elmts[0];
            }
            for (i; i < total; i++) {
                if (textNode) {
                    parent = this.elmts[i].parentNode || this.elmts[i].parent;
                    node = parseHTML(el);
                    parent.insertBefore(node, parent.firstChild);
                } else {
                    parent = this.previousElmt[i].firstChild.parentNode || this.previousElmt[i].firstChild.parent;
                    parent.insertBefore(node, this.previousElmt[i].firstChild);
                    node = el.elmts[0].cloneNode(true);
                }

            }
        } catch (err) {
            throw new Error('prepend:: ' + err.message);
        }
        return this;
    };
    NoJQuery.prototype.on = function(eventName, eventHandler) {
        var total = 0,
            i = 0;

        try {
            total = this.elmts.length;
            for (i; i < total; i++) {

                this.elmts[i][eventName] = eventHandler;
                this.elmts[i].addEventListener(eventName, this.elmts[i][eventName], false);
            }
        } catch (err) {
            throw new Error('on:: ' + err.message);
        }

        return this;
    };
    NoJQuery.prototype.off = function(eventName, eventHandler) {
        var total = 0,
            i = 0;
        try {
            total = this.elmts.length;
            i = 0;
            for (i; i < total; i++) {
                this.elmts[i].removeEventListener(eventName, this.elmts[i][eventName], false);
                this.elmts[i][eventName] = null;
            }
        } catch (err) {
            throw new Error('off:: ' + err.message);
        }

        return this;
    };
    return new NoJQuery();
}));
},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoJQuery = require('nojquery');

var Route = function () {
    function Route(obj) {
        _classCallCheck(this, Route);

        this.path = obj.path;
        this.transitionOut = obj.transitionOut;
        this.transitionOutComplete = obj.transitionOutComplete;
        this.transitionIn = obj.transitionIn;
        this.transitionInComplete = obj.transitionInComplete;

        this.added = false;
        this.visible = false;
        this.params = [];
    }

    _createClass(Route, [{
        key: 'onBeforeLeave',
        value: function onBeforeLeave() {
            this.beforeLeave();
        }
    }, {
        key: 'onComplete',
        value: function onComplete() {
            this.complete();
        }
    }]);

    return Route;
}();

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        this.routes = [];
        this.started = false;
        this.commands = [];
        this.queue = [];
        this.currentRoute;
        this.onNavigateCallback;
    }

    _createClass(Router, [{
        key: 'start',
        value: function start() {
            this.navigate(this.routes[0].path);
            this.started = true;
        }
    }, {
        key: 'back',
        value: function back() {
            var _this = this;

            if (this.commands.length > 1) {
                this.commands.pop();

                this.currentRoute.transitionOut();
                this.currentRoute.transitionOutComplete(this.currentRoute);

                this.currentRoute = this.queue.filter(function (r) {
                    return r.path === _this.commands[_this.commands.length - 1];
                })[0];
                this.currentRoute.transitionIn();
                this.currentRoute.transitionInComplete(this.currentRoute);
            }
        }
    }, {
        key: 'addRoute',
        value: function addRoute(route) {
            this.routes.push(route);
        }
    }, {
        key: 'navigate',
        value: function navigate(path) {
            var _this2 = this;

            var parts = path.split('/');
            parts.shift();
            if (parts[0] === '') {
                parts[0] = '/';
            }

            this.routes.map(function (item) {
                var p = item.path.split('/');
                var r = path.replace(/\/[0-9]/g, '/:id');
                p.shift();
                if (p[0] === '') {
                    p[0] = '/';
                }

                if (item.path === r && item.added === false) {
                    item.added = true;
                    item.params = parts;
                    _this2.queue.push(item);
                }

                if (_this2.commands.length === 0 || _this2.commands[_this2.commands.length - 1] !== r) {
                    _this2.commands.push(r);
                }
            });

            var nextRoute = this.queue.filter(function (r) {
                return r.path === _this2.commands[_this2.commands.length - 1];
            })[0];

            if (this.currentRoute && nextRoute.path !== this.currentRoute.path) {
                this.currentRoute.transitionOut();
                this.currentRoute.transitionOutComplete(this.currentRoute);
            }

            if (nextRoute.visible === false) {
                nextRoute.transitionIn();
                nextRoute.transitionInComplete(nextRoute);
                this.currentRoute = nextRoute;
            }
        }
    }, {
        key: 'onNavigate',
        value: function onNavigate(callback) {
            this.onNavigateCallback = callback;
        }
    }]);

    return Router;
}();

var App = function App() {
    _classCallCheck(this, App);

    console.log('app');

    document.getElementsByClassName('btn-push')[0].onclick = function clickPush() {
        router.navigate('/users');
    };

    document.getElementsByClassName('btn-pop')[0].onclick = function clickPop() {
        router.navigate('/users/:id');
    };

    document.getElementsByClassName('btn-back')[0].onclick = function clickPop() {
        router.back();
    };

    var router = new Router();
    router.onNavigate(function onNavigate(params) {
        console.log('onNavigate', params);
    });

    router.addRoute(new Route({
        path: '/',
        transitionOut: function transitionOut() {
            console.log('transitionOut /');
            $$('.first').removeClass('animate-complete').addClass('animate-out');
        },
        transitionOutComplete: function transitionOutComplete(route) {
            route.visible = false;
            console.log('transitionOut complete /');
            console.log('');
            $$('.first').removeClass('animate-out').addClass('animate-out-complete');
        },
        transitionIn: function transitionIn() {
            console.log('transitionIn /');
            $$('.first').addClass('animate-in').removeClass('animate-out-complete');
        },
        transitionInComplete: function transitionInComplete(route) {
            route.visible = true;
            console.log('transitionInComplete complete /', route);
            console.log('');
            $$('.first').removeClass('animate-in').addClass('animate-complete');
        }
    }));
    router.addRoute(new Route({
        path: '/users',
        transitionOut: function transitionOut() {
            console.log('transitionOut /users');
            $$('.second').removeClass('animate-complete').addClass('animate-out');
        },
        transitionOutComplete: function transitionOutComplete(route) {
            route.visible = false;
            console.log('transitionOut users /');
            console.log('');
            $$('.second').removeClass('animate-out').addClass('animate-out-complete');
        },
        transitionIn: function transitionIn() {
            console.log('transitionIn /users');
            $$('.second').addClass('animate-in').removeClass('animate-out-complete');
        },
        transitionInComplete: function transitionInComplete(route) {
            route.visible = true;
            console.log('transitionInComplete users /', route);
            console.log('');
            $$('.second').removeClass('animate-in').addClass('animate-complete');
        }
    }));

    router.addRoute(new Route({
        path: '/users/:id',
        transitionOut: function transitionOut() {
            console.log('transitionOut /users/:id');
            $$('.third').removeClass('animate-complete').addClass('animate-out');
        },
        transitionOutComplete: function transitionOutComplete(route) {
            route.visible = false;
            console.log('transitionOut /users/:id');
            console.log('');
            $$('.third').removeClass('animate-out');
        },
        transitionIn: function transitionIn() {
            console.log('transitionIn /users/:id');
            $$('.third').addClass('animate-in');
        },
        transitionInComplete: function transitionInComplete(route) {
            route.visible = true;
            console.log('transitionInComplete /users/:id', route);
            console.log('');
            $$('.third').removeClass('animate-in').addClass('animate-complete');
        }
    }));

    router.start();
};

var $$ = NoJQuery;
window.app = new App();

},{"nojquery":1}]},{},[2]);
