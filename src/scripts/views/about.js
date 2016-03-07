var template = require('../../../src/templates/about.html');
var Model = require('../models/about-model');

import * as BaseView from "../core/baseView.js";

class About {
    constructor(app) {
        console.log('BaseView', BaseView);
        console.log('main constructor');
        this.model = new Model();        
    };
    view() {
        console.log('main view');
        let view = app.handlebars.compile(template);
        view = view(this.model);
        console.log('base view');
        return view;
    };
    title() {
        console.log('main title');
        return this.model.title;
    };
    render() {
        console.log('main render');
    };
    destroy() {
        console.log('main destroy');
    };
    animateIn(complete) {
        app.controller.content.addClass('content-show');
        console.log('main animateIn');
        var timeout = setTimeout(() => {
            clearTimeout(timeout);
            complete();
        }, this.animationDuration);
    };
};

export default About;