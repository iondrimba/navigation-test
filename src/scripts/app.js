var NoJQuery = require('nojquery');

class Route {

    constructor(obj) {
        this.path = obj.path;
        this.transitionOut = obj.transitionOut;
        this.transitionOutComplete = obj.transitionOutComplete;
        this.transitionIn = obj.transitionIn;
        this.transitionInComplete = obj.transitionInComplete;

        this.added = false;
        this.visible = false;
        this.params = [];
    }
    onBeforeLeave() {
        this.beforeLeave();
    }
    onComplete() {
        this.complete();
    }
}

class Router {

    constructor() {
        this.routes = [];
        this.started = false;
        this.commands = [];
        this.queue = [];
        this.currentRoute;
        this.onNavigateCallback;
    }

    start() {
        this.navigate(this.routes[0].path);
        this.started = true;
    }

    back() {
        if (this.commands.length > 1) {
            this.commands.pop();

            this.currentRoute.transitionOut();
            this.currentRoute.transitionOutComplete(this.currentRoute);

            this.currentRoute = this.queue.filter((r) => {
                return r.path === this.commands[this.commands.length - 1];
            })[0];
            this.currentRoute.transitionIn();
            this.currentRoute.transitionInComplete(this.currentRoute);
        }
    }

    addRoute(route) {
        this.routes.push(route);
    }
    navigate(path) {
        let parts = path.split('/');
        parts.shift();
        if (parts[0] === '') {
            parts[0] = '/';
        }

        this.routes.map((item) => {
            let p = item.path.split('/');
            let r = path.replace(/\/[0-9]/g, '/:id');
            p.shift();
            if (p[0] === '') {
                p[0] = '/';
            }

            if (item.path === r && item.added === false) {
                item.added = true;
                item.params = parts;
                this.queue.push(item);
            }

            if (this.commands.length === 0 || this.commands[this.commands.length - 1] !== r) {
                this.commands.push(r);
            }
        });

        let nextRoute = this.queue.filter((r) => {
            return r.path === this.commands[this.commands.length - 1];
        })[0];

        if (this.currentRoute && (nextRoute.path !== this.currentRoute.path)) {
            this.currentRoute.transitionOut();
            this.currentRoute.transitionOutComplete(this.currentRoute);
        }

        if (nextRoute.visible === false) {
            nextRoute.transitionIn();
            nextRoute.transitionInComplete(nextRoute);
            this.currentRoute = nextRoute;
        }
    }
    onNavigate(callback) {
        this.onNavigateCallback = callback;
    }
}

class App {
    constructor() {
        console.log('app');

        document.getElementsByClassName('btn-push')[0].onclick = function clickPush() {
            router.navigate('/users');

        }

        document.getElementsByClassName('btn-pop')[0].onclick = function clickPop() {
            router.navigate('/users/:id');
        }

        document.getElementsByClassName('btn-back')[0].onclick = function clickPop() {
            router.back();
        }


        let router = new Router();
        router.onNavigate(function onNavigate(params) {
            console.log('onNavigate', params);
        })


        router.addRoute(new Route({
            path: '/',
            transitionOut: () => {
                console.log('transitionOut /');
                $$('.first').removeClass('animate-complete').addClass('animate-out');
            },
            transitionOutComplete: (route) => {
                route.visible = false;
                console.log('transitionOut complete /');
                console.log('');
                $$('.first').removeClass('animate-out').addClass('animate-out-complete');
            },
            transitionIn: () => {
                console.log('transitionIn /');
                $$('.first').addClass('animate-in').removeClass('animate-out-complete');
            },
            transitionInComplete: (route) => {
                route.visible = true;
                console.log('transitionInComplete complete /', route);
                console.log('');
                $$('.first').removeClass('animate-in').addClass('animate-complete');
            }
        }));
        router.addRoute(new Route({
            path: '/users',
            transitionOut: () => {
                console.log('transitionOut /users');
                $$('.second').removeClass('animate-complete').addClass('animate-out');
            },
            transitionOutComplete: (route) => {
                route.visible = false;
                console.log('transitionOut users /');
                console.log('');
                $$('.second').removeClass('animate-out').addClass('animate-out-complete');
            },
            transitionIn: () => {
                console.log('transitionIn /users');
                $$('.second').addClass('animate-in').removeClass('animate-out-complete');
            },
            transitionInComplete: (route) => {
                route.visible = true;
                console.log('transitionInComplete users /', route);
                console.log('');
                $$('.second').removeClass('animate-in').addClass('animate-complete');
            }
        }));

        router.addRoute(new Route({
            path: '/users/:id',
            transitionOut: () => {
                console.log('transitionOut /users/:id');
                $$('.third').removeClass('animate-complete').addClass('animate-out');
            },
            transitionOutComplete: (route) => {
                route.visible = false;
                console.log('transitionOut /users/:id');
                console.log('');
                $$('.third').removeClass('animate-out');
            },
            transitionIn: () => {
                console.log('transitionIn /users/:id');
                $$('.third').addClass('animate-in');
            },
            transitionInComplete: (route) => {
                route.visible = true;
                console.log('transitionInComplete /users/:id', route);
                console.log('');
                $$('.third').removeClass('animate-in').addClass('animate-complete');
            }
        }));


        router.start();
    }
}

let $$ = NoJQuery;
window.app = new App();