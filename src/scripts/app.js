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
        this.historyIndex = 0;
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

        if (this.historyIndex > 1) {
            this.historyIndex--;
            this.commands.pop();

            this.currentRoute.transitionOut();
            this.currentRoute.transitionOutComplete(this.currentRoute);

            this.currentRoute = this.queue.filter((r) => { return r.path === this.commands[this.commands.length - 1] })[0];
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

            if (this.commands.length === 0) {
                this.commands.push(r);
            } else if (this.commands[this.commands.length - 1] !== r) {
                this.commands.push(r);
            }
        });


        if (this.historyIndex > 0) {
            if (this.currentRoute && this.currentRoute.visible === true) {
                this.currentRoute.transitionOut();
                this.currentRoute.transitionOutComplete(this.currentRoute);
            }

        }
        if (this.commands.length) {
            this.currentRoute = this.queue.filter((r) => { return r.path === this.commands[this.commands.length - 1] })[0];
            if (this.currentRoute.visible === false) {
                this.currentRoute.transitionIn();
                this.currentRoute.transitionInComplete(this.currentRoute);
                this.historyIndex++;
            }
        }
    }
    onNavigate(callback) {
        this.onNavigateCallback = callback;
    }
}

class App {
    constructor() {
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

        }

        document.getElementsByClassName('btn-pop')[0].onclick = function clickPop(evt) {
            router.navigate('/users/:id');
        }

        document.getElementsByClassName('btn-back')[0].onclick = function clickPop(evt) {
            router.back();
        }


        let router = new Router();
        router.onNavigate(function onNavigate(params) {
            console.log('onNavigate', params);
        })


        router.addRoute(new Route({
            path: '/',
            transitionOut: () => { console.log('transitionOut /') },
            transitionOutComplete: (route) => {
                route.visible = false;
                console.log('transitionOut complete /');
            },
            transitionIn: () => { console.log('transitionIn /') },
            transitionInComplete: (route) => {
                route.visible = true;
                console.log('transitionInComplete complete /', route);
            }
        }));
        router.addRoute(new Route({
            path: '/users',
            transitionOut: () => { console.log('transitionOut /users') },
            transitionOutComplete: (route) => {
                route.visible = false;
                console.log('transitionOut complete /users', route);
            },
            transitionIn: () => { console.log('transitionIn /users') },
            transitionInComplete: (route) => {
                route.visible = true;
                console.log('transitionInComplete complete /users', route);
            }
        }));

        router.addRoute(new Route({
            path: '/users/:id',
            transitionOut: () => { console.log('transitionOut /users/:id') },
            transitionOutComplete: (route) => {
                route.visible = false;
                console.log('transitionOut complete /users/:id');
            },
            transitionIn: () => { console.log('transitionIn /users/:id') },
            transitionInComplete: (route) => {
                route.visible = true;
                console.log('transitionInComplete complete /users/:id');
            }
        }));


        router.start();
    }
}

window.app = new App();