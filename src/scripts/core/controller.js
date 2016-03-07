var Master = require('../partials/master');
//var Home = require('../views/home');
//var Contact = require('../views/contact');
///var About = require('../views/about');
//var NotFound = require('../views/notfound');

import * as Home from "../views/home.js";
import * as Contact from "../views/contact.js";
import * as About from "../views/about.js";
import * as NotFound from "../views/notfound.js";

var Controller = function Controller(app) {
    this.current;
    this.start = function() {
        this.masterPage();

        app.router('/', this.prerender.bind(this), this.home.bind(this));
        app.router('/contact', this.prerender.bind(this), this.contact.bind(this));
        app.router('/about', this.prerender.bind(this), this.about.bind(this));
        app.router('*', this.notFound.bind(this));
        app.router.exit('*', this.exit.bind(this));
        app.router();
    };
    this.masterPage = function(ctx, next) {
        this.master = new Master(app);
        this.master.setup();
        app.$('body').html(this.master.view());
        this.master.render();
        this.content = app.$('.content');
    };
    this.navigate = function(path) {
        if (path===undefined) {
            throw new Error('invalid path::' + path);
        }
        app.router(path);
    };
    this.empty = function() {
        this.content.empty();
    };
    this.add = function(html) {
        this.content.html(html);
    };

    this.exit = function(ctx, next) {
        this.content.removeClass('content-show');
        this.empty();
        this.current.destroy();
        this.current = null;
        next();
    };
    this.masterPageUpdate = function() {
        document.title = this.current.title();
    };
    this.createView = function(View) {
        this.current = new View.default(app);
        this.add(this.current.view());
        this.current.render();
        this.masterPageUpdate();
        var timeout = setTimeout(function() {
            this.current.animateIn(this.animateInComplete);
            clearTimeout(timeout);
        }.bind(this), 10);
    };
    this.animateInComplete = function() {
        console.log('controller animateInComplete');
    };
    this.prerender = function(ctx, next) {
        next();
    };
    this.home = function(ctx, next) {
        this.createView(Home);
    };
    this.contact = function(ctx, next) {
        this.createView(Contact);
    };
    this.about = function(ctx, next) {
        this.createView(About);
    };
    this.notFound = function(ctx, next) {
        this.createView(NotFound);
    };
};

module.exports = Controller;