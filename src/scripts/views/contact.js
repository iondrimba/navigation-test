var template = require('../../../src/templates/contact.html');
var Model = require('../models/contact-model');
import BaseView from '../core/baseView.js';

class Contact extends BaseView {
    constructor(app) {
        super(app);
        this.model = new Model();
    };
    view() {
        return super.view(template, this.model);
    };
    title() {
        return super.title();
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


export default Contact;