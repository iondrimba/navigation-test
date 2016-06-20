(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        this.historyIndex = 0;
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

            if (this.historyIndex > 1) {
                this.historyIndex--;
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

                if (_this2.commands.length === 0) {
                    _this2.commands.push(r);
                } else if (_this2.commands[_this2.commands.length - 1] !== r) {
                    _this2.commands.push(r);
                }
            });

            if (this.historyIndex > 0) {
                if (this.currentRoute && this.currentRoute.visible === true) {
                    this.currentRoute.transitionOut();
                    this.currentRoute.transitionOutComplete(this.currentRoute);
                }
            }
            if (this.commands.length) {
                this.currentRoute = this.queue.filter(function (r) {
                    return r.path === _this2.commands[_this2.commands.length - 1];
                })[0];
                if (this.currentRoute.visible === false) {
                    this.currentRoute.transitionIn();
                    this.currentRoute.transitionInComplete(this.currentRoute);
                    this.historyIndex++;
                }
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
    // let count=0;

    // window.onpopstate=function(event) {
    //     count--;
    //     console.log('location: '+document.location+', state: '+JSON.stringify(event.state));
    // };

    // window.onpagehide=function(event) {
    //     //console.log('onpagehide',event);
    // };

    // window.onpageshow=function(event) {
    //     //console.log('onpageshow',event);
    // };

    document.getElementsByClassName('btn-push')[0].onclick = function clickPush() {
        router.navigate('/users');
    };

    document.getElementsByClassName('btn-pop')[0].onclick = function clickPop(evt) {
        router.navigate('/users/:id');
    };

    document.getElementsByClassName('btn-back')[0].onclick = function clickPop(evt) {
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
        },
        transitionOutComplete: function transitionOutComplete(route) {
            route.visible = false;
            console.log('transitionOut complete /');
        },
        transitionIn: function transitionIn() {
            console.log('transitionIn /');
        },
        transitionInComplete: function transitionInComplete(route) {
            route.visible = true;
            console.log('transitionInComplete complete /', route);
        }
    }));
    router.addRoute(new Route({
        path: '/users',
        transitionOut: function transitionOut() {
            console.log('transitionOut /users');
        },
        transitionOutComplete: function transitionOutComplete(route) {
            route.visible = false;
            console.log('transitionOut complete /users', route);
        },
        transitionIn: function transitionIn() {
            console.log('transitionIn /users');
        },
        transitionInComplete: function transitionInComplete(route) {
            route.visible = true;
            console.log('transitionInComplete complete /users', route);
        }
    }));

    router.addRoute(new Route({
        path: '/users/:id',
        transitionOut: function transitionOut() {
            console.log('transitionOut /users/:id');
        },
        transitionOutComplete: function transitionOutComplete(route) {
            route.visible = false;
            console.log('transitionOut complete /users/:id');
        },
        transitionIn: function transitionIn() {
            console.log('transitionIn /users/:id');
        },
        transitionInComplete: function transitionInComplete(route) {
            route.visible = true;
            console.log('transitionInComplete complete /users/:id');
        }
    }));

    router.start();
};

window.app = new App();

},{}]},{},[1]);
