var template = require('../../../src/templates/home.html');
var Model = require('../models/home-model');
import BaseView from '../core/baseView.js';

class Home extends BaseView {

    constructor(app) {
        console.log('Home Construtor', app);
        super(app);
        this.button = null;
        this.model = new Model();
    }
    view() {
        return super.view(template, this.model);
    };
    title() {
        return super.title();
    };
    render() {
        this.button = this.app.$('.home').find('button');
        this.button.on('click', (evt) => this.click(evt));
    };
    click(evt) {
        console.log('home', this, evt);
    };
    destroy() {
        this.button.off('click');
        this.button = null;
    };
    animateIn(complete) {
        this.app.controller.content.addClass('content-show');

        super.animateIn(complete);
    };
};

export default Home;