'use strict'

var template = require('../../../src/templates/home.html');
var Model = require('../models/home-model');

class Home {

    constructor(app) {
        this.app = app;
        this.button = null;
        this.model = new Model();
    }
    view() {
        var view = this.app.handlebars.compile(template);
        view = view(this.model);
        return view;
    };
    title() {
        return this.model.title;
    };
    render() {
        this.button = this.app.$('.home').find('button');
        this.button.on('click', this.click.bind(this));
    };
    click() {
        alert('home');
    };
    destroy() {
        this.button.off('click');
        this.button = null;
    };
    animateIn(complete) {
        app.controller.content.addClass('content-show');
        var timeout = setTimeout(function() {
            clearTimeout(timeout);
            complete();
        }, 500);
    };
};


export default Home;