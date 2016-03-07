'use strict'

var template = require('../../../src/templates/contact.html');
var Model = require('../models/contact-model');

class Contact {
    constructor(app) {
        this.model = new Model();
    }
    view() {
        var view = app.handlebars.compile(template);
        view = view(this.model);
        return view;
    };
    title() {
        return this.model.title;
    };
    render() {};
    destroy() {};
    animateIn(complete) {
        app.controller.content.addClass('content-show');
        var timeout = setTimeout(function() {
            clearTimeout(timeout);
            complete();
        }, 500);
    };
};


export default Contact;