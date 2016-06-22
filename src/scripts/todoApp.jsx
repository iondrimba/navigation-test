import React from 'react';
import TodoAdd from './todoAdd.jsx';
import TodoList from './todoList.jsx';
import TodoFilter from './todoFilter.jsx';
import Home from './home.jsx';
import About from './about.jsx';
import Contact from './contact.jsx';
import { Link,withRouter } from 'react-router';
let $$=require('NoJQuery');


class Route1 {

    constructor(obj) {
        this.path=obj.path;
        this.transitionOut=obj.transitionOut;
        this.transitionOutComplete=obj.transitionOutComplete;
        this.transitionIn=obj.transitionIn;
        this.transitionInComplete=obj.transitionInComplete;

        this.added=false;
        this.visible=false;
        this.params=[];
    }
    onBeforeLeave() {
        this.beforeLeave();
    }
    onComplete() {
        this.complete();
    }
}

class Router1 {

    constructor() {
        this.routes=[];
        this.started=false;
        this.commands=[];
        this.queue=[];
        this.currentRoute;
        this.onNavigateCallback;
    }

    start() {
        this.navigate(this.routes[0].path);
        this.started=true;
    }

    back() {
        if(this.commands.length>1) {
            this.commands.pop();

            this.currentRoute.transitionOut();
            this.currentRoute.transitionOutComplete(this.currentRoute);

            this.currentRoute=this.queue.filter((r) => {
                return r.path===this.commands[this.commands.length-1];
            })[0];
            this.currentRoute.transitionIn();
            this.currentRoute.transitionInComplete(this.currentRoute);
        }
    }

    addRoute(route) {
        this.routes.push(route);
    }
    navigate(path) {
        let parts=path.split('/');
        parts.shift();
        if(parts[0]==='') {
            parts[0]='/';
        }

        this.routes.map((item) => {
            let p=item.path.split('/');
            let r=path.replace(/\/[0-9]/g,'/:id');
            p.shift();
            if(p[0]==='') {
                p[0]='/';
            }

            if(item.path===r&&item.added===false) {
                item.added=true;
                item.params=parts;
                this.queue.push(item);
            }

            if(this.commands.length===0||this.commands[this.commands.length-1]!==r) {
                this.commands.push(r);
            }
        });

        let nextRoute=this.queue.filter((r) => {
            return r.path===this.commands[this.commands.length-1];
        })[0];

        if(this.currentRoute&&(nextRoute.path!==this.currentRoute.path)) {
            this.currentRoute.transitionOut();
            this.currentRoute.transitionOutComplete(this.currentRoute);
        }

        if(nextRoute.visible===false) {
            nextRoute.transitionIn();
            nextRoute.transitionInComplete(nextRoute);
            this.currentRoute=nextRoute;
        }
    }
    onNavigate(callback) {
        this.onNavigateCallback=callback;
    }
}



class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

    }
    componentDidMount() {

        let router1=new Router1();

        router1.addRoute(new Route1({
            path: '/',
            transitionOut: () => {
                $$('.home').removeClass('animate-complete').addClass('animate-out');
            },
            transitionOutComplete: (route) => {
                route.visible=false;
                $$('.home').removeClass('animate-out').addClass('animate-out-complete');
            },
            transitionIn: () => {
                $$('.home').addClass('animate-in').removeClass('animate-out-complete');
            },
            transitionInComplete: (route) => {
                route.visible=true;
                $$('.home').removeClass('animate-in').addClass('animate-complete');
            }
        }));

        router1.addRoute(new Route1({
            path: '/contact',
            transitionOut: () => {
                $$('.contact').removeClass('animate-complete').addClass('animate-out');
            },
            transitionOutComplete: (route) => {
                route.visible=false;
                $$('.contact').removeClass('animate-out').addClass('animate-out-complete');
            },
            transitionIn: () => {
                $$('.contact').addClass('animate-in').removeClass('animate-out-complete');
            },
            transitionInComplete: (route) => {
                route.visible=true;
                $$('.contact').removeClass('animate-in').addClass('animate-complete');
            }
        }));

        router1.addRoute(new Route1({
            path: '/about',
            transitionOut: () => {
                $$('.about').removeClass('animate-complete').addClass('animate-out');
            },
            transitionOutComplete: (route) => {
                route.visible=false;
                $$('.about').removeClass('animate-out').addClass('animate-out-complete');
            },
            transitionIn: () => {
                $$('.about').addClass('animate-in').removeClass('animate-out-complete');
            },
            transitionInComplete: (route) => {
                route.visible=true;
                $$('.about').removeClass('animate-in').addClass('animate-complete');
            }
        }));

        $$('.back').on('click',() => {
            router1.back(); 
        });


        this.props.router.listen((p) => {
            router1.navigate(p.pathname);
        });

        router1.start();
    }
    getCount(array) {
        let count=0;
        if(this.state.filter==='completed') {
            array.map(function(item) {
                if(item.completed===true) {
                    count++;
                }
            });
        } else {
            count=array.length;
        }

        return count;
    }
    render() {
        return (
            <div>
                {' '}
                <Link to="/">Home</Link>
                {' '}
                <Link to="/contact">Contact</Link>
                {' '}
                <Link to="/about">About</Link>
                <button className="back">back</button><br/><br/><br/><br/>
                <Home/>
                <About/>
                <Contact/>
            </div>
        );
    }
}

export default withRouter(TodoApp);