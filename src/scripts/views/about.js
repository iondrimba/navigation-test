var template = require('../../../src/templates/about.html');
var Model = require('../models/about-model');
import BaseView from "../core/baseView.js";
import AboutModel from "../models/about-model.js";

class About extends BaseView {
    constructor(app) {
        super(app);
        this.model = new AboutModel();
    };
    view() {
        return super.view(template, this.model);
    };
    title() {
        return super.title;
    };
    render() {
        console.log('main render');
    };
    destroy() {
        console.log('main destroy');
    };
    animateIn(complete) {
        this.app.controller.content.addClass('content-show');
        super.animateIn(complete);
    };
};

export default About;