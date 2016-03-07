'use strict'

var template = require('../../../src/templates/notfound.html');
var Model = require('../models/notfound-model');
class NotFound {
    constructor(app) {
        this.model = new Model();
    };

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
        setTimeout(function() {
            complete();
            clearTimeout();
        }, 500);
    };
};

export default NotFound;